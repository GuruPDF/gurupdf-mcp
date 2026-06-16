# Releasing

How to cut a new release of `gurupdf-mcp` to **npm** and the **official MCP registry**.

## 1. Bump the version

Update `version` in **two files** — they must match (semver: patch for fixes/docs,
minor for new tools/features):

- `package.json` → `version`
- `server.json` → `version` **and** `packages[0].version` (two separate fields)

## 2. Build and check the tarball

```bash
npm run build              # tsc → dist/
npm pack --dry-run         # must list ONLY: dist/*.js, README.md, LICENSE, package.json
```

The `files` allowlist in `package.json` keeps `src`, configs, and env files out of the
published package. Confirm nothing stray is listed.

## 3. Commit, tag, push

```bash
git commit -am "chore(release): vX.Y.Z"
git tag -a vX.Y.Z -m "vX.Y.Z"
git push origin main --follow-tags
```

Then create a GitHub Release for the tag (optional but preferred).

## 4. Publish to npm

```bash
npm publish                # prepublishOnly rebuilds dist; published as public
```

Requires being logged in to npm as an owner of the package (`npm login`).

## 5. Publish to the MCP registry

```bash
mcp-publisher login github # GitHub OAuth — authorizes the io.github.GuruPDF namespace
mcp-publisher publish       # reads server.json
```

**Order matters: npm first.** The registry validates that the
`packages[0].version` declared in `server.json` already exists on npm.

## 6. Verify

```bash
npm view gurupdf-mcp version
curl -s "https://registry.modelcontextprotocol.io/v0/servers?search=gurupdf" \
  | grep -o '"version":"[^"]*"'
```

Both should report the new version. Most third-party MCP directories
(PulseMCP, mcp.so, Glama, …) auto-ingest from the official registry, so no separate
submission is needed there.
