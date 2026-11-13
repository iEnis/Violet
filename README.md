# Violet

An app for anything and everything

## How to use

> Install it from the releases tab <br>
> Once installed you can install extensions to add features to the app

## How to develop extensions

> Clone the Repo <br>
> Run `bun install`<br>
> Use `bun run dev` for running the app properly with hot module reloading<br>
> Use `bun run build:dev` for building a devbuild for the app for proper testing<br>
> Submit a pull request to add extensions

## Project Structure

```
└── src/
    ├── bun/
    │   ├── yourExtension/          #1
    │   │   ├── requests.ts         #4 Bun/Backend
    │   │   └── exports.ts          #5 Bun/Backend
    │   └── rpc.ts                  #6 Bun/Backend
    ├── mainview/
    │   ├── extensions/
    │   │   └── yourExtension/      #1
    │   │       ├── index.tsx       #2
    │   │       ├── manifest.ts     #3
    │   │       ├── routes.tsx      # Your Main React Page
    │   │       ├── requests.tsx    #4 React/Frontend
    │   │       └── exports.tsx     #5 React/Frontend
    │   └── lib/
    │       └── rpc.ts              #6 React/Frontend
    └── shared/
        └── rpc.d.ts                # Add types for your functions and methods
```

> 1 Switch with your extension name, preferably in camelCase <br>
> 2 export everything as default, check ./src/shared/extensions.d.ts for the type ExtensionExport <br>
> 3 Manifest for your Extension, check ./src/shared/extensions.d.ts for the type ExtensionManifest <br>
> 4 Add your backend or frontend functions and methods here (depending on if you're in the bun or react env) <br>
> 5 Export everything together here for better importing in the rpc.ts<br>
> 6 Import your functions and methods from the exports.ts and add them here <br>
