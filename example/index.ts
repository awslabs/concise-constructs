import * as apigw from "@aws-cdk/aws-apigateway";
import {C} from "../src";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

const code = new lambda.AssetCode(path.resolve(__dirname, "lambda/dist"));

const Stack = C(cdk.Stack, (def) => {
  const handler = def`handler`(lambda.Function, {
    code,
    handler: "a.handler",
    runtime: lambda.Runtime.NODEJS_12_X,
  });

  def`api`(apigw.LambdaRestApi, {handler});
});

const App = C(cdk.App, (def) => {
  def`stack`(Stack);
});

const app = new App();
app.synth();
