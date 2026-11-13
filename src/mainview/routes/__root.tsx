import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import TrianglifyBackground from "../components/Background";

export const Route = createRootRoute({
    component: () => (
        <main>
            <Sidebar />
            <TrianglifyBackground />
            <Outlet />
        </main>
    ),
});
