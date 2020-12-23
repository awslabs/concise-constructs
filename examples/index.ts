import cp from "child_process";
import fs from "fs";
import path from "path";

const command = process.argv.pop();
if (!command) {
  throw new Error("Must specify a CDK command.");
}

const app = process.argv.pop();
if (!app) {
  throw new Error(`Must specify one of the example directory names.`);
}

const appPath = path.resolve(__dirname, app);
const execSyncOptions: cp.ExecSyncOptions = {cwd: appPath, stdio: "inherit"};

if (
  fs.existsSync(path.resolve(appPath, "lambda")) &&
  ({
    deploy: true,
    diff: true,
    synth: true,
  } as Record<string, true>)[command]
) {
  cp.execSync(
    [
      `rm -rf ./lambda/dist`,
      [
        "esbuild",
        `./lambda`,
        `--outfile=./lambda/dist/index.js`,
        "--format=cjs",
        "--target=node12.2",
        "--bundle",
        "--sourcemap=inline",
        "--external:aws-sdk",
      ].join(" "),
    ].join(" && "),
    execSyncOptions,
  );
}

cp.execSync(["cdk", command, `--app 'ts-node .'`, `--outputs-file ./outputs.json`].join(" "), execSyncOptions);
