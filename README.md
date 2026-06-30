# JoeBot — MVP Setup

## Pacotes necessários

```bash
npm install ai @ai-sdk/google
```

> Next.js, React e Tailwind CSS já devem estar no seu projeto.
> Se estiver criando do zero: `npx create-next-app@latest joebot --typescript --tailwind --app`

## Variável de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```
GOOGLE_GENERATIVE_AI_API_KEY=sua_chave_aqui
```

Obtenha a chave gratuitamente em: https://aistudio.google.com/app/apikey

## Estrutura de arquivos

Copie os dois arquivos gerados para seu projeto Next.js:

```
app/
├── page.tsx              ← Interface do chat (substitua o page.tsx existente)
└── api/
    └── chat/
        └── route.ts      ← API route do JoeBot
```

## Deploy no Vercel

1. Faça o push do projeto para um repositório GitHub.
2. Acesse vercel.com → New Project → importe o repositório.
3. Em "Environment Variables", adicione `GOOGLE_GENERATIVE_AI_API_KEY`.
4. Deploy.

## Modelo usado

`gemini-1.5-flash` — rápido, eficiente e gratuito no tier de desenvolvimento.
Para produção com mais volume, considere `gemini-1.5-pro`.
