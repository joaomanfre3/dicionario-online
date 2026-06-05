"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { DictEntry } from "@/lib/dicionario";

export function EntryCard({ entry, position }: { entry: DictEntry; position: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.05 }}
      className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    >
      <h2 className="font-serif text-3xl font-bold tracking-tight" style={{ color: "var(--color-accent)" }}>
        {entry.word}
      </h2>

      {/* Sentidos numerados */}
      <ol className="mt-4 flex flex-col gap-3">
        {entry.senses.map((sense, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-ink/50">
              {i + 1}
            </span>
            <p className="leading-relaxed">
              {sense.grammar && (
                <span className="mr-1.5 rounded bg-accent/10 px-1.5 py-0.5 text-xs font-semibold italic" style={{ color: "var(--color-accent)", backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}>
                  {sense.grammar}
                </span>
              )}
              {sense.definition}
            </p>
          </li>
        ))}
      </ol>

      {/* Etimologia */}
      {entry.etymology && (
        <p className="mt-4 flex items-start gap-2 border-t border-black/5 pt-3 text-sm text-ink/50">
          <Sparkles size={14} className="mt-0.5 shrink-0" />
          <span><span className="font-semibold">Origem:</span> {entry.etymology}</span>
        </p>
      )}
    </motion.article>
  );
}
