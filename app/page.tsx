"use client";

import { useEffect, useState } from "react";
import { BookA, Loader2, Search, SearchX } from "lucide-react";
import { type DictEntry } from "@/lib/dicionario";
import { getDefinition } from "./actions";
import { EntryCard } from "@/components/EntryCard";

const STORAGE_KEY = "dicionario-online:recentes";

export default function Home() {
  const [term, setTerm] = useState("");
  const [searched, setSearched] = useState("");
  const [results, setResults] = useState<DictEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Carrega o histórico de buscas.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRecent(JSON.parse(raw));
    } catch {
      /* localStorage indisponível */
    }
    setHydrated(true);
  }, []);

  // Persiste o histórico.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
    } catch {
      /* ignora */
    }
  }, [recent, hydrated]);

  async function doSearch(word: string) {
    const w = word.trim();
    if (!w) return;
    setLoading(true);
    setSearched(w);
    setTerm(w);
    try {
      const entries = await getDefinition(w);
      setResults(entries);
      setRecent((prev) => [w, ...prev.filter((x) => x !== w)].slice(0, 8));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void doSearch(term);
  }

  if (!hydrated) return null;

  const notFound = !loading && results !== null && results.length === 0;

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col gap-5 px-4 py-8">
      <header className="flex items-center gap-2 px-1">
        <BookA size={28} style={{ color: "var(--color-accent)" }} />
        <h1 className="font-serif text-2xl font-bold tracking-tight">Dicionário</h1>
      </header>

      {/* Busca */}
      <form onSubmit={onSubmit} className="flex items-center gap-2 rounded-2xl bg-white px-4 shadow-sm ring-1 ring-black/5">
        <Search size={20} className="text-ink/40" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Digite uma palavra..."
          autoFocus
          className="w-full bg-transparent py-3.5 text-lg outline-none placeholder:text-ink/40"
        />
        <button
          type="submit"
          disabled={!term.trim() || loading}
          className="shrink-0 rounded-xl px-4 py-2 text-sm font-bold text-white transition disabled:opacity-30"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Buscar
        </button>
      </form>

      {/* Histórico (quando ainda não buscou) */}
      {results === null && recent.length > 0 && (
        <div>
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-ink/40">
            Buscas recentes
          </p>
          <div className="flex flex-wrap gap-2">
            {recent.map((w) => (
              <button
                key={w}
                onClick={() => doSearch(w)}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5 transition hover:ring-accent/30"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estados */}
      {loading && (
        <div className="flex flex-col items-center gap-2 py-16 text-ink/40">
          <Loader2 size={28} className="animate-spin" />
          <p className="text-sm">Procurando “{searched}”...</p>
        </div>
      )}

      {notFound && (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-ink/40">
          <SearchX size={30} strokeWidth={1.5} />
          <p className="text-sm">
            Não encontramos “{searched}”. Verifique a grafia e tente de novo.
          </p>
        </div>
      )}

      {results === null && recent.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-2 py-16 text-center text-ink/40">
          <BookA size={30} strokeWidth={1.5} />
          <p className="text-sm">Busque uma palavra pra ver o significado.</p>
        </div>
      )}

      {/* Resultados */}
      {!loading && results && results.length > 0 && (
        <div className="flex flex-col gap-4">
          {results.map((entry, i) => (
            <EntryCard key={i} entry={entry} position={i} />
          ))}
        </div>
      )}

      <footer className="mt-auto pt-4 text-center text-xs text-ink/30">
        Definições do Dicionário Aberto · consultadas ao vivo
      </footer>
    </main>
  );
}
