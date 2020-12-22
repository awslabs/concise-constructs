// TODO
import {C} from "../../src";
import * as s3 from "@aws-cdk/aws-s3";
import * as cdk from "@aws-cdk/core";

const Stack = C(cdk.Stack, (def) => {
  const bucket = def`bucket`(s3.Bucket);

  def`bucketArn`(cdk.CfnOutput, {
    exportName: "bucketArn",
    value: bucket.bucketArn,
  });
});

const App = C(cdk.App, (def) => {
  def`stack`(Stack);
});

new App().synth();
