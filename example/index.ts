import {C} from "../src";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import cp from "child_process";
import path from "path";

// build the lambda code for deployment
cp.execSync(
  [
    "esbuild", // our compiler & packager
    "./lambda", // the directory containing our entry file `index.ts`
    "--bundle", // bundle into one output file
    "--format=cjs", // Lambda functions support the CommonJS format
    "--sourcemap=inline", // sourcemaps let us more-easily debug
    "--target=node12.2", // this is the latest Lambda-supported Node version
    "--external:aws-sdk", // we don't want to bundle the AWS SDK (it's preloaded in Lambda function environments)
    "--outfile=lambda-dist/index.js", // where to build the bundle
  ].join(" "),
  {cwd: __dirname},
);

// create the `AssetCode` instance for later use in any Lambda function(s)
const code = new lambda.AssetCode(path.resolve(__dirname, "lambda-dist"));

// define the `Stack`
const Stack = C(cdk.Stack, (def) => {
  // define a handler, which will use the `helloConciseConstructsHandler` exported from our bundle
  const handler = def`handler`(lambda.Function, {
    code,
    handler: "index.helloConciseConstructsHandler",
    runtime: lambda.Runtime.NODEJS_12_X,
  });

  // define an API, with the handler from above
  def`api`(apigw.LambdaRestApi, {handler});
});

// define the `App` (the root of our construct graph)
const App = C(cdk.App, (def) => {
  def`stack`(Stack);
});

// synthesize to the file system (to-be deployed!)
new App().synth();
