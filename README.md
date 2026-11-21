# Violet

An app for anything and everything <br>

## How to use

> Install it from the releases tab <br>
> Once installed you can install extensions to add features to the app <br>

## How to develop extensions

> Clone the Repo <br>
> Run `bun install` <br>
> Use `bun run dev` for running the app properly with hot module reloading <br>
> Use `bun run build:dev` for building a devbuild of the app for proper testing <br>
> Submit a pull request to add extensions <br>

## Project Structure

```
└── src/
    ├── bun/
    │   ├── extensions/
    │   │   └── yourExtension/      #1
    │   │       ├── rpc.ts          #6 Bun/Backend
    │   │       ├── requests.ts     #4 Bun/Backend
    │   │       └── exports.ts      #5 Bun/Backend
    │   └── rpc.ts                  #7 Bun/Backend
    └── mainview/
        ├── extensions/
        │   └── yourExtension/      #1
        │       ├── rpc.ts          #6 Bun/Backend
        │       ├── index.tsx       #2
        │       ├── manifest.ts     #3
        │       ├── routes.tsx      # Your Main React Page
        │       ├── requests.tsx    #4 React/Frontend
        │       └── exports.tsx     #5 React/Frontend
        └── lib/
            └── rpc.ts              #7 React/Frontend
```

> 1 Switch with your extension name, preferably in camelCase <br>

> 2 export everything as default, check ./src/shared/extensions.d.ts for the type ExtensionExport <br>

> 3 Manifest for your Extension, check ./src/shared/extensions.d.ts for the type ExtensionManifest <br>

> 4 Add your backend or frontend functions and methods here (depending on if you're in the bun or react env) <br>

> 5 Export everything together here for better importing in the rpc.ts <br>

> 6 Optional file for sending data between the backend and frontend using rpc (use your extension name as a namespace "yourExtension_someFunctionCall") <br>

> 7 Access the rpc calls that are declared inside your own rpc files (run your app to generate the files needed for proper types support, also use the frontend rpc file for the backend calls and also other way around for the backend) <br>

### Usage of the rpc:

```ts
// file inside your frontend
import { rpc } from "../../lib/rpc.ts";
const data = await rpc.request.yourExtension_backendCall();
```

```ts
// file inside your backend
import { rpc } from "../../rpc.ts";
const data = await rpc.request.yourExtension_frontendCall();
```
