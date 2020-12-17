# Concise Constructs

[![npm version](https://img.shields.io/npm/v/style-dictionary.svg?style=flat-square)](https://badge.fury.io/js/style-dictionary) ![license](https://img.shields.io/npm/l/style-dictionary.svg?style=flat-square) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/amzn/style-dictionary/blob/master/CONTRIBUTING.md#submitting-pull-requests)

**A function-feeling utility for defining constructs, without the cognitive overhead of scope.** "Concise" constructs are interoperable with classical constructs. The difference is cosmetic; if concise constructs better-jive with your API design sensibilities, great! Otherwise, [classical constructs](https://github.com/aws/constructs) are still state of the art.

---

## Resources

- [Video Tutorial (in progress) &rarr;](#)<br />A friendly end-to-end introduction on YouTube
- [Guide &rarr;](docs/guide.md)<br /> An explanation of the mechanics
- [Example &rarr;](example)<br />An example API for your viewing pleasure

## Installation

**Node** users can install with [npm](https://www.npmjs.com/package/concise-constructs).

```sh
npm install concise-constructs
```

> Packaged as [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1), alongside corresponding type definitions.

## Snippet

```ts
import {C} from "concise-constructs";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

const Stack = C(cdk.Stack, (define) => ({
  fn: define`fn`(lambda.Function, {
    code: new lambda.InlineCode(`...`),
    handler: "handler",
    runtime: lambda.Runtime.NODEJS_12_X,
  }),
}));

const App = C(cdk.App, (define) => {
  define`stack`(Stack);
});

new App().synth();
```

... is equivalent to the following.

```ts
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

class Stack extends cdk.Stack {
  fn;

  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    this.fn = new lambda.Function(this, "fn", {
      code: new lambda.InlineCode(`...`),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}

class App extends cdk.App {
  constructor() {
    super();

    new Stack(this, "stack");
  }
}

new App().synth();
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
