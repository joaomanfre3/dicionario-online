# 📖 Dicionário Online

Consulte o significado de palavras em português, com classe gramatical, definições numeradas e a origem (etimologia). Rápido, simples e sem cadastro.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Server Actions](https://img.shields.io/badge/Server_Actions-000?logo=nextdotjs&logoColor=white)

## O que faz

- **Busca de palavras** em português com resultado na hora
- **Definições numeradas**, com a **classe gramatical** de cada sentido
- **Etimologia** (origem da palavra), quando disponível
- **Histórico** das últimas buscas pra repetir num toque
- Estados claros de carregando e de "palavra não encontrada"
- 100% **responsivo**

## O diferencial técnico

A consulta acontece numa **Next.js Server Action** (`app/actions.ts`): o servidor busca o verbete no **Dicionário Aberto**, que devolve o conteúdo em **XML (formato TEI)**, e faz o **parse manual** — extrai a forma da palavra, cada sentido (classe gramatical + definição) e a etimologia, **sem nenhuma biblioteca**. O navegador nunca chama a API direto.

A API é **gratuita e sem token**, então o projeto roda na Vercel sem nenhuma variável de ambiente.

## Stack

Next.js 16 (App Router + Server Actions) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide. Sem banco — só o histórico de buscas fica no `localStorage`.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Deploy

Pronto pra Vercel — importe o repositório, build padrão (`next build`), zero variáveis de ambiente.

---

Feito por [@joaomanfre3](https://github.com/joaomanfre3).
