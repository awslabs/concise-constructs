import {assert, IsExact} from "conditional-type-checks";
import {Ctor} from "./ctor";
import type * as cdk from "@aws-cdk/core";
import type * as cdk8s from "cdk8s";

describe("Ctor", () => {
  it("IsRoot Type", () => {
    expect.assertions(0);
    assert<IsExact<Ctor.IsRoot<typeof cdk.App>, true>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk.Stack>, false>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk.Construct>, false>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk8s.App>, true>>(true);
    assert<IsExact<Ctor.IsRoot<typeof cdk8s.Chart>, false>>(true);
  });
});
