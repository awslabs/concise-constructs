import {C} from "../src";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

// create the `AssetCode` instance for later use in any Lambda function(s)
const code = new lambda.AssetCode(path.resolve(__dirname, "lambda-dist"));

// define the `Stack`
const Stack = C(cdk.Stack, (def, environment?: Record<string, string>) => {
  // define a handler, which will use the `helloConciseConstructsHandler` export
  const handler = def`handler`(lambda.Function, {
    code,
    handler: "index.helloConciseConstructsHandler",
    runtime: lambda.Runtime.NODEJS_12_X,
    environment,
  });

  // define an API, with the handler from above
  def`api`(apigw.LambdaRestApi, {handler});
});

// define the `App`
const App = C(cdk.App, (def) => {
  def`stack`(Stack, {SOME_ENV_VAR: "Lorem ipsum dolor!"});
});

// synthesize to the file system (to-be deployed!)
new App().synth();
