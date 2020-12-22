import cp from "child_process";

const command = process.argv.pop();
if (!command) {
  throw new Error("Must specify a CDK command.");
}

const app = process.argv.pop();
if (!app) {
  throw new Error(`Must specify one of the example directory names.`);
}

const execSyncOptions: cp.ExecSyncOptions = {cwd: __dirname, stdio: "inherit"};

if (
  ({
    deploy: true,
    diff: true,
    synth: true,
  } as Record<string, true>)[command]
) {
  cp.execSync(
    [
      `rm -rf ./${app}/lambda/dist`,
      [
        "esbuild",
        `./${app}/lambda`,
        `--outfile=./${app}/lambda/dist/index.js`,
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

cp.execSync(`cdk ${command} --app 'ts-node ./${app}'`, execSyncOptions);
