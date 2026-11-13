import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { loadExtension } from "../extensions/manager";
import type { ExtensionModule } from "../extensions/types";

export const Route = createFileRoute("/$")({
    component: ExtensionRoute,
});

function ExtensionRoute() {
    const { _splat } = Route.useParams();
    const [extension, setExtension] = useState<ExtensionModule | null>(null);

    const [id, ...path] = (_splat ?? "").split("/");

    useEffect(() => {
        let active = true;

        setExtension(null);

        loadExtension(id)
            .then((module) => {
                if (active) setExtension(module);
            })
            .catch(() => {
                if (active) setExtension(null);
            });

        return () => {
            active = false;
        };
    }, [id]);

    if (!extension) return <div>Loading...</div>;

    const Page = extension.routes?.[`/${id}`];

    if (!Page) return <div>Page not found</div>;

    return <Page />;
}
