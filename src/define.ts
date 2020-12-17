import {Construct} from "constructs";
import * as u from "./util";
import {Ctor} from "./ctor";

export interface Define<Scope extends Construct> {
  (quasis: TemplateStringsArray, ...rest: string[]): <Ctor extends Ctor.Child.Make<Scope, any, Construct>>(
    Ctor: Ctor,
    ...rest: u.InRest.Props<Ctor.Props<Ctor>, false>
  ) => InstanceType<Ctor>;
  scope: Scope;
}

export function Define<Scope extends Construct>(scope: Scope) {
  const define: Define<Scope> = (quasis, ...rest) => {
    const id = u.recombineTaggedTemplateArgs(quasis, ...rest);

    return (Ctor, ...[props]) => {
      return new Ctor(scope, id, props) as any;
    };
  };
  define.scope = scope;
  return define;
}
