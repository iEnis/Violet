import { electrobunViteAliases } from "./.hutch/devkit/api/config/electrobun-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
    plugins: [
        tanstackRouter({
            routesDirectory: resolve(__dirname, "./src/mainview/routes"),
            generatedRouteTree: resolve(__dirname, "./src/mainview/routeTree.gen.ts"),
            target: "react",
            autoCodeSplitting: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: electrobunViteAliases(resolve(__dirname, ".hutch/devkit")),
    },
    root: "src/mainview",
    build: {
        outDir: "../../dist",
        emptyOutDir: true,

        manifest: true,
        assetsDir: "assets",

        rolldownOptions: {
            output: {
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name][extname]",
                // entryFileNames: "assets/[name]-[hash].js",
                // chunkFileNames: "assets/[name]-[hash].js",
                // assetFileNames: "assets/[name]-[hash][extname]",

                codeSplitting: true,
            },
        },
    },
    server: {
        port: 5173,
        strictPort: true,
    },
});
