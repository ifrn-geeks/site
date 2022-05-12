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
  },
  async redirects() {
    return [
      {
        source: "/hackathon",
        destination: "https://suap.ifrn.edu.br/eventos/inscricao_publica/3161/",
        permanent: true
      }
    ]
  }
}
