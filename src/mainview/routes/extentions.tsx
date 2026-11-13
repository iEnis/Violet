import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
    getInstalledExtensions,
    loadExtension,
} from "../extensions/manager";
import type { ExtensionModule } from "../extensions/types";

export const Route = createFileRoute("/extentions")({
    component: Extensions,
});

function Extensions() {
    const [extensions, setExtensions] = useState<ExtensionModule[]>([]);

    useEffect(() => {
        async function load() {
            const installed = getInstalledExtensions();

            const modules = await Promise.all(
                installed.map(extension => loadExtension(extension.id)),
            );

            setExtensions(modules);
        }

        load();
    }, []);

    return (
        <>
            {extensions.map((extension) =>
                Object.entries(extension.routes ?? {}).map(([path, Component]) => (
                    <Component key={path} />
                ))
            )}
        </>
    );
}