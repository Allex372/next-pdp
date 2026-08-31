import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const apiDir = "src/app/api";
const middlewareFile = "src/middleware.ts";
const stashDir = "deploy/.api-stash";

function stashPath(name) {
  return `${stashDir}/${name}`;
}

function hideForStaticBuild() {
  rmSync(stashDir, { recursive: true, force: true });
  mkdirSync(stashDir, { recursive: true });

  const hidden = [];

  if (existsSync(apiDir)) {
    renameSync(apiDir, stashPath("api"));
    hidden.push("api");
  }

  if (existsSync(middlewareFile)) {
    renameSync(middlewareFile, stashPath("middleware.ts"));
    hidden.push("middleware");
  }

  return hidden;
}

function restoreAfterBuild(hidden) {
  if (existsSync(stashPath("api"))) {
    if (existsSync(apiDir)) {
      rmSync(apiDir, { recursive: true, force: true });
    }
    renameSync(stashPath("api"), apiDir);
  }

  if (existsSync(stashPath("middleware.ts"))) {
    if (existsSync(middlewareFile)) {
      rmSync(middlewareFile, { force: true });
    }
    renameSync(stashPath("middleware.ts"), middlewareFile);
  }

  if (hidden.length > 0) {
    rmSync(stashDir, { recursive: true, force: true });
  }
}

const hidden = hideForStaticBuild();

const result = spawnSync("next", ["build"], {
  stdio: "inherit",
  env: { ...process.env, DEPLOY_TARGET: "static" },
});

restoreAfterBuild(hidden);
process.exit(result.status ?? 1);
