// Tipos do dicionário — lógica pura, sem React.

export interface Sense {
  /** Classe gramatical, ex.: "s.m.", "f.", "v.t.". */
  grammar?: string;
  definition: string;
}

export interface DictEntry {
  word: string;
  senses: Sense[];
  etymology?: string;
}

/** Normaliza o termo buscado (minúsculo, sem espaços nas pontas). */
export function normalizeTerm(term: string): string {
  return term.trim().toLowerCase();
}
