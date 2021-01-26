import {Construct} from "constructs";
import type * as cdk from "@aws-cdk/core";

export namespace Ctor {
  type Self = Ctor;

  export type Make<Args extends any[], Instance extends Construct> = new (...args: Args) => Instance;

  export namespace Root {
    export type Make<Props, Instance extends Construct> = Ctor.Make<[props: Props], Instance>;

    export type Props<Ctor extends Root> = ConstructorParameters<Ctor>[0];
  }
  export type Root = Root.Make<any, Construct>;

  export namespace Child {
    export type Make<Scope extends Construct, Props, Instance extends Construct> = Ctor.Make<
      [scope: Scope, id: string, props: Props],
      Instance
    >;

    export type Props<Ctor extends Child> = ConstructorParameters<Ctor>[2];
  }
  export type Child = Child.Make<Construct, any, Construct>;

  export type IsRoot<Ctor extends Self> = Ctor extends Child
    ? ConstructorParameters<Ctor> extends []
      ? true
      : false
    : Ctor extends Root
    ? true
    : InstanceType<Ctor> extends cdk.App
    ? true
    : false;

  export type Props<Ctor extends Self> = IsRoot<Ctor> extends true ? Root.Props<Ctor> : Child.Props<Ctor>;
}

export type Ctor = Ctor.Make<any[], Construct>;
