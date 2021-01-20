import {assert, IsExact} from "conditional-type-checks";
import {C} from "..";
import {Construct} from "constructs";

namespace fixtures {
  export class Root extends Construct {
    constructor() {
      super((undefined as unknown) as Construct, "root");
    }
  }

  export namespace Root {
    export class WithProps extends Root {
      constructor(public props: string) {
        super();
      }
    }

    export class WithOptionalProps extends Root {
      constructor(public props?: string) {
        super();
      }
    }

    export class WithPropsOrUndef extends Root {
      constructor(public props: string | undefined) {
        super();
      }
    }
  }

  export class Child extends Construct {
    constructor(scope: Construct, id: string) {
      super(scope, id);
    }
  }

  export namespace Child {
    export class WithProps extends Child {
      constructor(scope: Construct, id: string, public props: string) {
        super(scope, id);
      }
    }

    export class WithOptionalProps extends Child {
      constructor(scope: Construct, id: string, public props?: string) {
        super(scope, id);
      }
    }

    export class WithPropsOrUndef extends Child {
      constructor(scope: Construct, id: string, public props: string | undefined) {
        super(scope, id);
      }
    }
  }
}

interface Props {
  a: string;
}
const props: Props = {a: "a"};
const scope = (undefined as unknown) as Construct;

describe("Produced Types", () => {
  it("Roots", () => {
    expect.assertions(0);

    (() => {
      const Ctor0 = C(fixtures.Root, () => {});
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root>>(true);
      // @ts-expect-error
      C(fixtures.Root, () => {}, "");
      C(
        fixtures.Root,
        () => {},
        // @ts-expect-error
        () => undefined as any,
      );

      const Ctor1 = C(fixtures.Root, (_def, _props: Props) => {});
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root>>(true);
      // @ts-expect-error
      C(fixtures.Root, (_def, _props: Props) => {}, "");
      C(
        fixtures.Root,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => undefined as any,
      );

      const Ctor2 = C(fixtures.Root, (_def, _props?: Props) => {});
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root>>(true);
      // @ts-expect-error
      C(fixtures.Root, (_def, _props?: Props) => {}, "");
      C(
        fixtures.Root,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => undefined as any,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Root.WithProps, () => {}, "");
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithProps, () => {});
      // @ts-expect-error
      C(fixtures.Root.WithProps, () => {}, true);
      C(
        fixtures.Root.WithProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Root.WithProps, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithProps, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Root.WithProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        (_props) => true,
      );

      const Ctor2 = C(fixtures.Root.WithProps, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root.WithProps>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithProps, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Root.WithProps,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Root.WithOptionalProps, () => {});
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root.WithOptionalProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithOptionalProps, () => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Root.WithOptionalProps, (_def, _props: Props) => {});
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root.WithOptionalProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithOptionalProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Root.WithOptionalProps, (_def, _props?: Props) => {});
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root.WithOptionalProps>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root.WithOptionalProps>>(true);
      // @ts-expect-error
      C(fixtures.Root.WithOptionalProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Root.WithOptionalProps, () => {}, "");
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root.WithOptionalProps>>(true);
      C(fixtures.Root.WithOptionalProps, () => {});
      // @ts-expect-error
      C(fixtures.Root.WithOptionalProps, () => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Root.WithOptionalProps, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root.WithOptionalProps>>(true);
      C(fixtures.Root.WithOptionalProps, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithOptionalProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Root.WithOptionalProps, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root.WithOptionalProps>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root.WithOptionalProps>>(true);
      C(fixtures.Root.WithOptionalProps, (_def, _props?: Props) => {});
      // @ts-ignore
      C(fixtures.Root.WithOptionalProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Root.WithOptionalProps,
        (_def, _props?: Props) => {},
        // @ts-ignore
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Root.WithPropsOrUndef, () => {}, "");
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, () => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, () => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root.WithPropsOrUndef>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Root.WithPropsOrUndef, () => {}, "");
      const instance0 = new Ctor0();
      assert<IsExact<typeof instance0, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, () => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, () => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(props);
      assert<IsExact<typeof instance1, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, (_def, _props: Props) => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(props);
      assert<IsExact<typeof instance2_0, fixtures.Root.WithPropsOrUndef>>(true);
      const instance2_1 = new Ctor2();
      assert<IsExact<typeof instance2_1, fixtures.Root.WithPropsOrUndef>>(true);
      C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Root.WithPropsOrUndef, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Root.WithPropsOrUndef,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();
  });

  it("Children", () => {
    (() => {
      const Ctor0 = C(fixtures.Child, () => {});
      const instance0 = new Ctor0(scope, "a");
      assert<IsExact<typeof instance0, fixtures.Child>>(true);
      // @ts-expect-error
      C(fixtures.Child, () => {}, "");

      const Ctor1 = C(fixtures.Child, (_def, _props: Props) => {});
      const instance1 = new Ctor1(scope, "b", props);
      assert<IsExact<typeof instance1, fixtures.Child>>(true);
      // @ts-expect-error
      C(fixtures.Child, (_def, _props: Props) => {}, "");

      const Ctor2 = C(fixtures.Child, (_def, _props?: Props) => {});
      const instance2_0 = new Ctor2(scope, "c", props);
      assert<IsExact<typeof instance2_0, fixtures.Child>>(true);
      const instance2_1 = new Ctor2(scope, "d");
      assert<IsExact<typeof instance2_1, fixtures.Child>>(true);
      // @ts-expect-error
      C(fixtures.Child, (_def, _props?: Props) => {}, "");
    })();

    (() => {
      const Ctor0 = C(fixtures.Child.WithProps, () => {}, "");
      const instance0 = new Ctor0(scope, "e");
      assert<IsExact<typeof instance0, fixtures.Child.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Child.WithProps, () => {});
      // @ts-expect-error
      C(fixtures.Child.WithProps, () => {}, true);
      C(
        fixtures.Child.WithProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Child.WithProps, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(scope, "f", props);
      assert<IsExact<typeof instance1, fixtures.Child.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Child.WithProps, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Child.WithProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Child.WithProps, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(scope, "g", props);
      assert<IsExact<typeof instance2_0, fixtures.Child.WithProps>>(true);
      const instance2_1 = new Ctor2(scope, "h");
      assert<IsExact<typeof instance2_1, fixtures.Child.WithProps>>(true);
      // @ts-expect-error
      C(fixtures.Child.WithProps, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Child.WithProps,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Child.WithOptionalProps, () => {}, "");
      const instance0 = new Ctor0(scope, "i");
      assert<IsExact<typeof instance0, fixtures.Child.WithOptionalProps>>(true);
      C(fixtures.Child.WithOptionalProps, () => {});
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, () => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {});
      const instance1 = new Ctor1(scope, "j", props);
      assert<IsExact<typeof instance1, fixtures.Child.WithOptionalProps>>(true);
      C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {}, "");
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Child.WithOptionalProps, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(scope, "k", props);
      assert<IsExact<typeof instance2_0, fixtures.Child.WithOptionalProps>>(true);
      const instance2_1 = new Ctor2(scope, "l");
      assert<IsExact<typeof instance2_1, fixtures.Child.WithOptionalProps>>(true);
      C(fixtures.Child.WithOptionalProps, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Child.WithOptionalProps, () => {}, "");
      const instance0 = new Ctor0(scope, "m");
      assert<IsExact<typeof instance0, fixtures.Child.WithOptionalProps>>(true);
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, () => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(scope, "n", props);
      assert<IsExact<typeof instance1, fixtures.Child.WithOptionalProps>>(true);
      C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, (_def, _props: Props) => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Child.WithOptionalProps, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(scope, "o", props);
      assert<IsExact<typeof instance2_0, fixtures.Child.WithOptionalProps>>(true);
      const instance2_1 = new Ctor2(scope, "p");
      assert<IsExact<typeof instance2_1, fixtures.Child.WithOptionalProps>>(true);
      // @ts-expect-error
      C(fixtures.Child.WithOptionalProps, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Child.WithOptionalProps,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Child.WithPropsOrUndef, () => {}, "");
      const instance0 = new Ctor0(scope, "q");
      assert<IsExact<typeof instance0, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, () => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, () => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(scope, "r", props);
      assert<IsExact<typeof instance1, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(scope, "s", props);
      assert<IsExact<typeof instance2_0, fixtures.Child.WithPropsOrUndef>>(true);
      const instance2_1 = new Ctor2(scope, "t");
      assert<IsExact<typeof instance2_1, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();

    (() => {
      const Ctor0 = C(fixtures.Child.WithPropsOrUndef, () => {}, "u");
      const instance0 = new Ctor0(scope, "v");
      assert<IsExact<typeof instance0, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, () => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, () => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        () => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor1 = C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {}, "");
      const instance1 = new Ctor1(scope, "w", props);
      assert<IsExact<typeof instance1, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, (_def, _props: Props) => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        (_def, _props: Props) => {},
        // @ts-expect-error
        () => true,
      );

      const Ctor2 = C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {}, "");
      const instance2_0 = new Ctor2(scope, "x", props);
      assert<IsExact<typeof instance2_0, fixtures.Child.WithPropsOrUndef>>(true);
      const instance2_1 = new Ctor2(scope, "y");
      assert<IsExact<typeof instance2_1, fixtures.Child.WithPropsOrUndef>>(true);
      C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {});
      // @ts-expect-error
      C(fixtures.Child.WithPropsOrUndef, (_def, _props?: Props) => {}, true);
      C(
        fixtures.Child.WithPropsOrUndef,
        (_def, _props?: Props) => {},
        // @ts-expect-error
        () => true,
      );
    })();
  });
});
