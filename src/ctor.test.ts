import {assert, IsExact} from "conditional-type-checks";
import type * as cdk from "@aws-cdk/core";
import {Ctor} from "./ctor";

describe("Ctor", () => {
  it("IsRoot Type", () => {
    expect.assertions(0);
    assert<IsExact<Ctor.IsRoot<typeof cdk.App>, true>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk.Stack>, false>>(true);
  });
});
