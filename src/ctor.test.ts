import {assert, IsExact} from "conditional-type-checks";
import {Ctor} from "./ctor";
import type * as cdk from "@aws-cdk/core";

describe("Ctor", () => {
  it("IsRoot Type", () => {
    expect.assertions(0);
    assert<IsExact<Ctor.IsRoot<typeof cdk.App>, true>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk.Stack>, false>>(true);
  });
});
