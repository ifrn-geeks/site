/** @type {import("next").NextConfig} */
import { randomUUID } from "crypto"
import dotenv from "dotenv"

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
  }
}
