import {C} from "../../src";
import * as apigw from "@aws-cdk/aws-apigateway";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

const code = new lambda.AssetCode(path.resolve(__dirname, "lambda", "dist"));

const Stack = C(cdk.Stack, (def, environment?: Record<string, string>) => {
  const handler = def`handler`(lambda.Function, {
    code,
    handler: "index.helloConciseConstructsHandler",
    runtime: lambda.Runtime.NODEJS_12_X,
    environment,
  });

  def`api`(apigw.LambdaRestApi, {handler});
});

const App = C(cdk.App, (def) => {
  def`stack`(Stack, {SOME_ENV_VAR: "Lorem ipsum dolor!"});
});

new App().synth();
