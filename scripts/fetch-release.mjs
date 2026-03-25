#!/usr/bin/env node

/**
 * Fetch the latest release info from GitHub API and write to static/release.json.
 * Run during CI build or locally: node scripts/fetch-release.mjs
 */

const REPO = "opskat/opskat";
const OUTPUT = "static/release.json";

const PLATFORM_MAP = {
  "darwin-arm64": "macOS (Apple Silicon)",
  "darwin-amd64": "macOS (Intel)",
  "windows-amd64": "Windows (x64)",
  "linux-amd64": "Linux (x64)",
};

async function main() {
  const url = `https://api.github.com/repos/${REPO}/releases/latest`;
  console.log(`Fetching latest release from ${url}...`);

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
  });

  if (!res.ok) {
    // Fallback: write a default release.json so the build doesn't break
    console.warn(`GitHub API returned ${res.status}, writing fallback release.json`);
    const fallback = {
      version: "v1.0.0",
      assets: Object.entries(PLATFORM_MAP).map(([id, label]) => ({
        id,
        label,
        url: `https://github.com/${REPO}/releases/latest`,
      })),
    };
    const fs = await import("fs");
    fs.writeFileSync(OUTPUT, JSON.stringify(fallback, null, 2));
    console.log(`Wrote fallback ${OUTPUT}`);
    return;
  }

  const data = await res.json();
  const version = data.tag_name;
  console.log(`Latest release: ${version}`);

  const assets = [];
  for (const [platformId, label] of Object.entries(PLATFORM_MAP)) {
    // Find the matching asset by platform ID in the filename
    const asset = data.assets.find((a) => a.name.includes(platformId));
    assets.push({
      id: platformId,
      label,
      url: asset
        ? asset.browser_download_url
        : `https://github.com/${REPO}/releases/tag/${version}`,
      fileName: asset ? asset.name : undefined,
    });
  }

  const result = { version, assets };

  const fs = await import("fs");
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
  console.log(`Wrote ${OUTPUT} with ${assets.length} platforms`);
}

main().catch((err) => {
  console.error("Failed to fetch release:", err.message);
  process.exit(1);
});
