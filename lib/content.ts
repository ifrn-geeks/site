import { Octokit } from "octokit";
import matter from "gray-matter"
import slugify from "slugify"
import { readFile, writeFile } from "fs/promises"
import os from "os"
import path from "path"

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

export interface Path {
  type: "aulas" | "equipe"
  name: string
  path: string
  content: string
  frontMatter: any
}

export async function getPaths(): Promise<Path[]> {
  const cachePath = (path.join(
    os.tmpdir(),
    `next-build-cache-${process.env.BUILD_ID}`
  ))

  try {
    const cache = await readFile(cachePath, "utf8")

    if (cache) {
      return JSON.parse(cache)
    }
  } catch {}

  const { data } = await octokit.rest.git.getTree({
    owner: "ifrn-geeks",
    repo: "site-content",
    tree_sha: "main",
    recursive: "1"
  })

  const response = await Promise.all(data.tree
    .filter((path) => path.type === "blob" && path.path !== "README.md")
    .map(async ({ path, sha }) => {
      var dirName, fileName
      [dirName, fileName] = path!.split("/")
      const slug = slugify(fileName.split(".")[0], { lower: true })
      const { data: { content: fileContent } } = await octokit.request(`GET /repos/{owner}/{repo}/git/blobs/{file_sha}`, {
        owner: "ifrn-geeks",
        repo: "site-content",
        file_sha: sha!,
      })
      const fileContentDecoded = Buffer.from(fileContent, "base64").toString("utf-8")
      const { data: frontMatter, content } = matter(fileContentDecoded)
      return { type: dirName, name: slug, path: `${dirName}/${slug}`, content, frontMatter }
    }))

  await writeFile(cachePath, JSON.stringify(response, null, 2))

  //@ts-ignore
  return response
}

export async function getPathContent(path: string) {
  const data = (await getPaths()).find((item) => item.path === path)

  return data!
}
