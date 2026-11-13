import { useEffect, useRef } from "react";

export default function TrianglifyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        let animationFrame: number;
        let time = 0;

        const spacing = 100;
        const points: { x: number; y: number; phase: number }[] = [];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            points.length = 0;

            for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
                for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
                    points.push({
                        x: x + (Math.random() - 0.5) * spacing,
                        y: y + (Math.random() - 0.5) * spacing,
                        phase: Math.random() * Math.PI * 2,
                    });
                }
            }
        }

        function animate() {
            time += 0.005;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Triangles would be generated from the point grid here.
            // Animate each point using its phase and time.

            animationFrame = requestAnimationFrame(animate);
        }

        resize();
        window.addEventListener("resize", resize);
        animate();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 50,
                pointerEvents: "none",
            }}
        />
    );
}
