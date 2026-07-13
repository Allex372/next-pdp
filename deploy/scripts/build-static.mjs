import { existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const apiDir = "src/app/api";
const stashDir = "deploy/.api-stash";

function hideApiRoute() {
  if (!existsSync(apiDir)) {
    return false;
  }

  rmSync(stashDir, { recursive: true, force: true });
  mkdirSync(stashDir, { recursive: true });
  renameSync(apiDir, `${stashDir}/api`);
  return true;
}

function restoreApiRoute(hidden) {
  if (!hidden || !existsSync(`${stashDir}/api`)) {
    return;
  }

  if (existsSync(apiDir)) {
    rmSync(apiDir, { recursive: true, force: true });
  }

  renameSync(`${stashDir}/api`, apiDir);
  rmSync(stashDir, { recursive: true, force: true });
}

const hidden = hideApiRoute();

const result = spawnSync("next", ["build"], {
  stdio: "inherit",
  env: { ...process.env, DEPLOY_TARGET: "static" },
});

restoreApiRoute(hidden);
process.exit(result.status ?? 1);
