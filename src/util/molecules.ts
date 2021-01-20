export type AnyRec = Record<PropertyKey, any>;
export namespace AnyRec {
  export type Or<O> = AnyRec | O;
  export namespace Or {
    export type Undef = Or<void>;
  }
}
