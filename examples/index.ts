import {buildSync} from "esbuild";
import cp from "child_process";
import del from "del";
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

function gqlCodeGen() {
  if (fs.existsSync(path.resolve(appPath, "codegen.yml"))) {
    cp.execSync("graphql-codegen", execSyncOptions);
  }
}

if (command === "gql-code-gen") {
  gqlCodeGen();
} else {
  if (
    ({
      deploy: true,
      destroy: true,
      diff: true,
      synth: true,
    } as Record<string, true>)[command]
  ) {
    gqlCodeGen();

    if (fs.existsSync(path.resolve(appPath, "lambda"))) {
      del.sync(path.join(appPath, "lambda", "dist"));
      const lambdaPath = path.join(appPath, "lambda");
      buildSync({
        minify: true,
        entryPoints: [path.join(lambdaPath, "index.ts")],
        bundle: true,
        external: ["aws-sdk"],
        format: "cjs",
        outfile: path.join(lambdaPath, "dist", "index.js"),
        sourcemap: "inline",
        target: "node12.2",
      });
    }
  }

  cp.execSync(["cdk", command, `--app 'ts-node .'`, `--outputs-file ./outputs.json`].join(" "), execSyncOptions);
}
