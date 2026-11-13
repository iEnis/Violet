import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    return (
        <>
            <h1>About</h1>

            <Link to="/">Home</Link>
        </>
    );
}
