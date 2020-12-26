// TODO
import {C} from "../../src";
import * as appsync from "@aws-cdk/aws-appsync";
import * as cdk from "@aws-cdk/core";
import * as ddb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import path from "path";

const code = new lambda.AssetCode(path.resolve(__dirname, "lambda", "dist"));

const Stack = C(cdk.Stack, (def) => {
  const api = def`api`(appsync.GraphqlApi, {
    name: "api",
    schema: appsync.Schema.fromAsset("schema.gql"),
    xrayEnabled: true,
  });

  def`graphqlUrl`(cdk.CfnOutput, {exportName: "graphqlUrl", value: api.graphqlUrl!});
  def`apiKey`(cdk.CfnOutput, {exportName: "apiKey", value: api.apiKey!});

  const db = def`db`(ddb.Table, {
    billingMode: ddb.BillingMode.PAY_PER_REQUEST,
    partitionKey: {
      name: "id",
      type: ddb.AttributeType.STRING,
    },
  });

  ([
    {typeName: "Query", fieldName: "note"},
    {typeName: "Query", fieldName: "notes"},
    {typeName: "Mutation", fieldName: "createNote"},
    {typeName: "Mutation", fieldName: "deleteNote"},
  ] as appsync.BaseResolverProps[]).forEach((p) => {
    const handler = def`${p.fieldName}Handler`(lambda.Function, {
      code,
      environment: {TABLE_NAME: db.tableName},
      handler: `index.${p.fieldName}Handler`,
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    db.grantFullAccess(handler);

    api.addLambdaDataSource(`${p.fieldName}DataSource`, handler).createResolver(p);
  });
});

const App = C(cdk.App, (def) => {
  def`stack`(Stack);
});

new App().synth();
