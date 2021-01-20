import {Ctor} from "./ctor";
import {Define} from "./define";
import * as u from "./util";

/**
 * @param BaseCtor The base constructor from which your construct's constructor should extend.
 * @param produce A function which utilizes its exposed `Define` to instantiate constructs and return to-be
 * members for the "produced" constructor.
 * @param basePropsOrMapper In cases where the base construct accepts props, this argument can be a mapping
 * function from `Parameters<Produce>[1]` to the base constructor's props. This argument cannot be supplied
 * should the base constructor not accept props.
 */
export function C<
  BaseCtor extends Ctor,
  BaseInstance extends InstanceType<BaseCtor>,
  Produce extends (define: Define<BaseInstance>, props: any) => (Partial<BaseInstance> & u.AnyRec) | void,
  Props extends Parameters<Produce>[1],
  AdditionalMembers extends ReturnType<Produce>
>(
  BaseCtor: BaseCtor,
  produce: Produce,
  ...[basePropsOrMapper]: u.InRest.BasePropsOrMapper<Props, Ctor.Props<BaseCtor>>
): Ctor.Make<
  Ctor.IsRoot<BaseCtor> extends true
    ? u.InRest.Props<Props>
    : [scope: ConstructorParameters<BaseCtor>[0], id: string, ...rest: u.InRest.Props<Props>],
  AdditionalMembers extends void ? BaseInstance : BaseInstance & AdditionalMembers
> {
  return class extends BaseCtor {
    constructor(...[parentOrProps, idOrUndef, propsOrUndef]: any[]) {
      const props = propsOrUndef || parentOrProps;
      const propsForSuper = typeof basePropsOrMapper === "function" ? (basePropsOrMapper as any)(props) : props;
      super(...(idOrUndef ? [parentOrProps, idOrUndef, propsForSuper] : [propsForSuper]));
      const define = Define(this as any);
      const produced = produce(define, props);
      produced && Object.assign(this, produced);
    }
  } as any;
}
