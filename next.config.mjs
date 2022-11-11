/** @type {import("next").NextConfig} */
import { randomUUID } from "crypto"
import dotenv from "dotenv"
import WindiCSSWebpackPlugin from "windicss-webpack-plugin"

dotenv.config()

const buildId = randomUUID()

export default {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    BUILD_ID: buildId,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "react/jsx-runtime.js": "preact/compat/jsx-runtime",
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat"
      }
    }

    config.plugins.push(new WindiCSSWebpackPlugin())

    return config
  }
}
