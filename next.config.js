/** @type {import("next").NextConfig} */
const randomUUID = require("crypto").randomUUID
const dotenv = require("dotenv")

dotenv.config()

const buildId = randomUUID()

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    BUILD_ID: buildId,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  }
}
