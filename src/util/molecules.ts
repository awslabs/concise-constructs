export type AnyRecOr<Or> = Record<PropertyKey, any> | Or;
export namespace AnyRecOr {
  export type Undef = AnyRecOr<undefined>;
  export type Void = AnyRecOr<void>;
}
