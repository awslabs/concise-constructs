```ts
import {C} from "concise-constructs";
```

The `C` utility lets us make new construct constructors with less boilerplate. The base constructor––from which you'd typically extend––is the first argument to `C`. The second argument is an producer function, from which we can optionally return data to be used as members of the `C`-returned constructor's instances.

```ts
import * as cdk from "@aws-cdk/core";
import {C} from "concise-constructs";

const Stack = C(cdk.Stack, (define) => {
  //                        ^
  //                        we'll get to this soon

  return {hi: "Sam"};
});

const app = new cdk.App();
const stack = new Stack(app, "my-stack");
stack.hi; // "Sam"
```

To reiterate: calling `C` gives us a new construct constructor––extending the supplied base (arg 0)––which contains its 2nd-argument-returned data as members of any instance.

This new constructor can be used by classical constructs. Aka., concise constructs are 1st class citizens! Users can mix and match as they please.

```ts
import {Construct} from "@aws-cdk/core";
import {C} from "concise-constructs";

const B = C(Construct, (define) => {
  define`child`(Construct);
});

class C extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new B(this, "b");
  }
}

class D extends C(Construct, (define) => {
  define`extended`(C);
}) {}

class E extends D {
  constructor(scope: Construct, id: string, props: {name: string}) {
    super(scope, id);

    console.log(`Hello ${name}`);
  }
}

const stack = new E(undefined, "root", {name: "Elad"});
```

Note how we can extend the `C`-produced constructor (as seen by `D`), as to define another class constructor.

To define custom props on the resulting construct constructor, we add a second parameter to the init function:

```ts
interface MyProps {
  hello: string;
}

const Stack = C8(cdk.Stack, (define, props: MyProps) => {
  // ...
});

const stack = new Stack(scope, "my-id"); // type-error: expected 3rd argument
const stack = new Stack(scope, "my-id", {hello: "world"});
```

The constructor will also respect optionality.

```diff
interface MyProps {
  hello: string;
}

- const Stack = C8(cdk.Stack, (define, props: MyProps) => {
+ const Stack = C8(cdk.Stack, (define, props?: MyProps) => {
  // ...
});

- const stack = new Stack(scope, "my-id"); // type-error: expected 3rd argument
+ const stack = new Stack(scope, "my-id"); // no longer a type error
const stack = new Stack(scope, "my-id", {hello: "world"});
```

To correctly handle calls to super, one can supply a third argument to `C`: a mapping function, (in this case, an identity) which accepts the producer function's props and returns the inherited construct constructor's props.

```ts
const Stack = C(
  cdk.Stack,
  (define, props?: cdk.StackProps) => {
    // ...
  },
  (props) => props,
);
```

Within the init closure, we have access to a define function / callable object. We can use it to instantiate constructs without supplying scope.

```ts
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import {C} from "concise-constsructs";

const Stack = C8(cdk.Stack, (define) => {
  define`handler`(lambda.Function, {
    code: new lambda.InlineCode(`...`),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_12_X,
  });
});
```

The value returned from define is the instance of `lambda.Function`. Let's capture it in a variable, and ensure that it is a member of the resulting construct constructor:

```diff
const Stack = C8(cdk.Stack, (define) => {
- define`handler`(lambda.Function, {
+ const fn = define`handler`(lambda.Function, {
    code: new lambda.InlineCode(`...`),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_12_X,
  });

+ return { fn };
});
```

The resulting constructor will have `fn` as a member of its instances.

```ts
type Stack = typeof Stack;
type Instance = InstanceType<Stack>;
declare const instance: Instance;
instance.fn; // lambda.Function
```

Scope is also accessible on the `define` function (just incase).

```ts
C(cdk.Construct, (define) => {
  define.scope; // cdk.Construct
});
```
