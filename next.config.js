/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['puppeteer-core'],
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
