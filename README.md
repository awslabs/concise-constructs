# Concise Constructs

[![npm version](https://img.shields.io/npm/v/concise-constructs.svg?style=flat-square)](https://badge.fury.io/js/concise-constructs) ![license](https://img.shields.io/npm/l/concise-constructs.svg?style=flat-square) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/awslabs/concise-constructs/blob/master/CONTRIBUTING.md#submitting-pull-requests)

**A utility for defining constructs without ever needing to think about scope.** "Concise" constructs are interoperable with classical constructs. The difference is cosmetic; if concise constructs better-jive with your API-design sensibilities, great! Otherwise, [classical constructs](https://github.com/aws/constructs) are still state of the art.

> NOTE: [JSII](https://github.com/aws/jsii) cannot yet package concise constructs for consumption in non-TypeScript CDK projects.

---

## Resources

<!-- - [Video Tutorial &rarr;](#)<br />A friendly end-to-end introduction on YouTube -->

- [Guide &rarr;](docs/guide.md)<br />An explanation of the mechanics
- [Rest API Example &rarr;](examples/rest-api)<br />Using Lambda & API Gateway
- [GraphQL API &rarr;](examples/graphql-api)<br />Using AppSync, Lambda Resolvers & DynamoDB

## Installation

**Node** users can install with [npm](https://www.npmjs.com/package/concise-constructs).

```sh
npm install concise-constructs
```

> Packaged as [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1), alongside corresponding type definitions.

## Lambda Rest API Snippet

```ts
import {C} from "concise-constructs";
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

const Stack = C(cdk.Stack, (define) => ({
  fn: define`my-fn`(lambda.Function, {
    code: new lambda.AssetCode(path.resolve(__dirname, "lambda")),
    handler: "index.handler",
    runtime: lambda.Runtime.NODEJS_12_X,
  }),
}));

const App = C(cdk.App, (define) => {
  define`my-stack`(Stack);
});

new App().synth();
```

... is equivalent to the following.

```ts
import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

class Stack extends cdk.Stack {
  fn;

  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    this.fn = new lambda.Function(this, "my-fn", {
      code: new lambda.AssetCode(path.resolve(__dirname, "lambda")),
      handler: "index.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}

class App extends cdk.App {
  constructor() {
    super();

    new Stack(this, "my-stack");
  }
}

new App().synth();
```

## SQS + SNS Snippet

```ts
import {C} from "concise-constructs";
import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";
import * as sns from "@aws-cdk/aws-sns";

const Stack = C(cdk.Stack, (define) => {
  const queue = define`HelloCdkQueue`(sqs.Queue, {
    visibilityTimeout: cdk.Duration.seconds(300),
  });

  const topic = define`HelloCdkTopic`(sns.Topic);

  topic.addSubscription(new subs.SqsSubscription(queue));

  return {queue, topic};
});
```

... is equivalent to the following.

```ts
import * as cdk from "@aws-cdk/core";
import * as sqs from "@aws-cdk/aws-sqs";
import * as sns from "@aws-cdk/aws-sns";

class HelloCdkStack extends cdk.Stack {
  queue;
  topic;

  constructor(scope: cdk.App, id: string) {
    super(scope, id, props);

    this.queue = new sqs.Queue(this, "HelloCdkQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    this.topic = new sns.Topic(this, "HelloCdkTopic");

    topic.addSubscription(new subs.SqsSubscription(this.queue));
  }
}
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
