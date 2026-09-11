# prompt-cn-ui

Customizable AI UI components. Fork of [prompt-kit](https://www.prompt-kit.com/), published as your own shadcn registry.

## Run the docs

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Install a component into another app

```sh
npx shadcn@latest add "http://localhost:3000/c/model-select.json"
```

After you deploy, set `NEXT_PUBLIC_SITE_URL` to that origin and use that URL instead of localhost.

## Add a component to this kit

See `/docs/create`. Short path:

1. Add `components/prompt-kit/your-name.tsx`
2. Register it in `scripts/registry-components.ts`
3. Add `app/docs/your-name/page.mdx` and a route in `app/routes.ts`
4. Run `npm run build:registry`
