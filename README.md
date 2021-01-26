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

## Snippets

### Lambda Rest API

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

<details closed>
<summary>... is equivalent to the following.</summary>

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

</details>

### SQS + SNS

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

const App = C(cdk.App, (define) => {
  const stack = define`my-stack`(Stack);
  stack.queue; // sqs.Queue
  stack.topic; // sns.Topic
});
```

<details closed>
<summary>... is equivalent to the following.</summary>

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

class App extends cdk.App {
  constructor() {
    super();

    const stack = new Stack(this, "my-stack");
    stack.queue; // sqs.Queue
    stack.topic; // sns.Topic
  }
}

new App().synth();
```

</details>

### Lambda CRON

```ts
import {C} from "concise-constructs";
import * as cdk from "@aws-cdk/core";
import * as events from "@aws-cdk/aws-events";
import * as lambda from "@aws-cdk/aws-lambda";
import * as targets from "@aws-cdk/aws-event-targets";

const Stack = C(cdk.Stack, (define) => {
  const codePath = path.resolve(__dirname, "lambda-handler.ts");
  const codeSrc = fs.readFileSync(codePath, {encoding: "utf-8"});
  const code = new lambda.InlineCode(code);

  const lambdaFn = define`singleton`(lambda.Function, {
    code,
    handler: "index.main",
    timeout: cdk.Duration.seconds(300),
    runtime: lambda.Runtime.PYTHON_3_6,
  });

  const rule = def`rule`(events.Rule, {
    schedule: events.Schedule.expression("cron(0 18 ? * MON-FRI *)"),
  });

  rule.addTarget(new targets.LambdaFunction(lambdaFn));
});

const App = C(cdk.App, (define) => {
  const stack = define`my-stack`(Stack);
});

new App().synth();
```

<details closed>
<summary>... is equivalent to the following.</summary>

```ts
import * as cdk from "@aws-cdk/core";
import * as events from "@aws-cdk/aws-events";
import * as lambda from "@aws-cdk/aws-lambda";
import * as targets from "@aws-cdk/aws-event-targets";

class Stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const codePath = path.resolve(__dirname, "lambda-handler.ts");
    const codeSrc = fs.readFileSync(codePath, {encoding: "utf-8"});
    const code = new lambda.InlineCode(code);

    const lambdaFn = new lambda.Function(this, "singleton", {
      code,
      handler: "index.main",
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_6,
    });

    const rule = new events.Rule(this, "rule", {
      schedule: events.Schedule.expression("cron(0 18 ? * MON-FRI *)"),
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFn));
  }
}

class App extends cdk.App {
  constructor() {
    new Stack(this, "my-stack");
  }
}

new App().synth();
```

</details>

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.
