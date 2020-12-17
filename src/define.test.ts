import {assert, IsExact} from "conditional-type-checks";
import * as cdk from "@aws-cdk/core";
import {Define} from "./define";
import * as lambda from "@aws-cdk/aws-lambda";

const stackScope = new cdk.Stack();
const define = Define(stackScope);
const handler = define`handler`(lambda.Function, {
  code: new lambda.InlineCode("..."),
  handler: "handler",
  runtime: lambda.Runtime.NODEJS_12_X,
});

describe("Define", () => {
  it("Types", () => {
    expect.assertions(1);
    assert<IsExact<typeof define, Define<cdk.Stack>>>(true);
    assert<IsExact<typeof handler, lambda.Function>>(true);
    expect(define.scope instanceof cdk.Stack).toBeTruthy();
  });

  it("Mounts Child Construct", () => {
    expect.assertions(1);
    expect(stackScope.node.children[0]).toBe(handler);
  });
});
