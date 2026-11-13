// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useQuery } from "@tanstack/react-query";

// export const Route = createFileRoute("/")({
//     component: Home,
// });

// function Home() {
//     return <></>;
// }

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
    component: Home,
});

import { rpc } from "../lib/rpc";

function Home() {
    rpc.request.getExtensions();
    const { data, isPending, error } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            return response.json() as Promise<{ id: number; title: string }[]>;
        },
    });

    if (isPending) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <h1>Home</h1>

            <ul>
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

            <Link to="/about">About</Link>
        </div>
    );
}
