import type { ExtensionLoader, ExtensionModule } from "../../shared/extensions";

export const registry = import.meta.glob<ExtensionModule>("./*/index.tsx", {
    import: "default",
}) as Record<string, ExtensionLoader>;
