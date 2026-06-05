"use server";

import { type DictEntry, type Sense, normalizeTerm } from "@/lib/dicionario";

/** Remove tags e decodifica as entidades mais comuns de um trecho de XML. */
function clean(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&(?:apos|#39);/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pega o conteúdo da primeira tag `name` dentro de um trecho. */
function firstTag(xml: string, name: string): string | undefined {
  const m = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`).exec(xml);
  return m ? clean(m[1]) : undefined;
}

/** Interpreta um <entry> TEI em palavra + sentidos + etimologia. */
function parseEntry(xml: string, fallbackWord: string): DictEntry {
  const word = firstTag(xml, "orth") ?? fallbackWord;
  const etymology = firstTag(xml, "etym");

  const senses: Sense[] = [];
  const senseRe = /<sense[^>]*>([\s\S]*?)<\/sense>/g;
  let match: RegExpExecArray | null;
  while ((match = senseRe.exec(xml))) {
    const inner = match[1];
    const grammar = firstTag(inner, "gramGrp");
    const defRe = /<def[^>]*>([\s\S]*?)<\/def>/g;
    let def: RegExpExecArray | null;
    while ((def = defRe.exec(inner))) {
      const definition = clean(def[1]);
      if (definition) senses.push({ grammar, definition });
    }
  }

  return { word, senses, etymology };
}

/**
 * Server Action: busca o significado de uma palavra no Dicionário Aberto.
 *
 * Roda no servidor — o navegador não chama a API direto. A API devolve o
 * verbete em XML (formato TEI), interpretado aqui sem nenhuma biblioteca.
 * Gratuita e sem token, então roda na Vercel sem variável de ambiente.
 */
export async function getDefinition(term: string): Promise<DictEntry[]> {
  const word = normalizeTerm(term);
  if (word.length < 1) return [];

  const res = await fetch(`https://api.dicionario-aberto.net/word/${encodeURIComponent(word)}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];

  const data: { xml: string }[] = await res.json();
  return (Array.isArray(data) ? data : [])
    .map((item) => parseEntry(item.xml ?? "", word))
    .filter((entry) => entry.senses.length > 0);
}
