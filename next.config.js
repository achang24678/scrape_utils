/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // serverComponentsExternalPackages: ['chrome-aws-lambda', 'puppeteer-core'],
        serverComponentsExternalPackages: ['puppeteer-core'],
    },
    typescript: {
        ignoreBuildErrors: true
    }
}

module.exports = nextConfig
