import {AnyRec} from "./molecules";

export namespace InRest {
  export type Props<Props, EmptyIfUndef extends boolean = true> = Props extends undefined
    ? [] | (EmptyIfUndef extends true ? never : [props: undefined])
    : undefined extends Props
    ? [props?: Props]
    : [props: Props];

  export type BasePropsOrMapper<P extends AnyRec.Or.Undef, B extends AnyRec.Or.Undef> = B extends undefined
    ? []
    : undefined extends B
    ? P extends undefined
      ? [baseProps?: B]
      : [mapToBase?: (...rest: Props<P>) => B] | [baseProps?: B]
    : [mapToBase: (...rest: Props<P>) => B] | [baseProps: B];
}
