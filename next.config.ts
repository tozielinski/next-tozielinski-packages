import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        qualities: [25, 50, 75],
    },
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', 'localhost', '192.168.2.22'],
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.torstenzielinski.de/js/script.js",
            },
            {
                source: "/api/event",
                destination: "https://plausible.torstenzielinski.de/api/event",
            },
        ]
    },
};

export default nextConfig;
