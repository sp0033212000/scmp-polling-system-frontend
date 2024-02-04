/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/rewrite/scmp-api/:path*",
                destination: `${process.env.SCMP_API_URL}/:path*`,
                locale: false,
            },
        ];
    },
    env: {
        SCMP_API_URL: process.env.SCMP_API_URL,
    },
};

export default nextConfig;
