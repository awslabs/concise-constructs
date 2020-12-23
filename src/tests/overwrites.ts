import {C} from "..";
import * as cdk from "@aws-cdk/core";

describe("Overwrites", () => {
  it("Conflicting type fails", () => {
    expect.assertions(0);

    // @ts-expect-error
    C(cdk.Stack, () => {
      return {
        environment: 123,
      };
    });
  });

  it("Compatible type succeeds", () => {
    expect.assertions(0);

    C(cdk.Stack, () => {
      return {
        environment: "hello",
      };
    });
  });

  it("Narrowing the chain", () => {
    expect.assertions(0);

    const StackA = C(cdk.Stack, () => {
      return {
        environment: "literal" as "literal" | undefined,
      };
    });

    // @ts-expect-error
    C(StackA, () => {
      return {
        environment: "something-else",
      };
    });

    const StackB = C(StackA, () => {
      return {
        environment: "literal",
      };
    });

    // @ts-expect-error
    C(StackB, () => {
      return {
        environment: "yo",
      };
    });

    C(StackA, () => {
      return {
        environment: undefined,
      };
    });
  });
});
