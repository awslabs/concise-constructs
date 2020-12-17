import {Ctor} from "./ctor";
import {Define} from "./define";
import * as u from "./util";

export function C<
  BaseCtor extends Ctor,
  Produce extends (define: Define<InstanceType<BaseCtor>>, props: any) => u.AnyRecOr.Void,
  Props extends Parameters<Produce>[1],
  AdditionalMembers extends ReturnType<Produce>
>(BaseCtor: BaseCtor, produce: Produce, ...[basePropsOrMapper]: u.InRest.BasePropsOrMapper<Props, Ctor.Props<BaseCtor>>) {
  return (class extends BaseCtor {
    constructor(...[parentOrProps, idOrUndef, propsOrUndef]: any[]) {
      const props = propsOrUndef || parentOrProps;
      const propsForSuper = typeof basePropsOrMapper === "function" ? (basePropsOrMapper as any)(props) : props;
      super(...(idOrUndef ? [parentOrProps, idOrUndef, propsForSuper] : [propsForSuper]));
      const define = Define(this as any);
      const produced = produce(define, props);
      if (produced) {
        Object.assign(this, produced);
      }
    }
  } as unknown) as Ctor.Make<
    Ctor.IsRoot<BaseCtor> extends true
      ? u.InRest.Props<Props>
      : [scope: ConstructorParameters<BaseCtor>[0], id: string, ...rest: u.InRest.Props<Props>],
    AdditionalMembers extends void ? InstanceType<BaseCtor> : InstanceType<BaseCtor> & AdditionalMembers
  >;
}
