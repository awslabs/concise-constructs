import {C} from "..";
import * as s3 from "@aws-cdk/aws-s3";
import * as cdk from "@aws-cdk/core";

describe("Basic", () => {
  it("S3", () => {
    expect.assertions(1);

    class ClassicalS3Stack extends cdk.Stack {
      constructor(app: cdk.App) {
        super(app, "stack-id");

        new s3.Bucket(this, "bucket-id", {
          encryption: s3.BucketEncryption.KMS,
        });
      }
    }
    const classicalApp = new cdk.App();
    new ClassicalS3Stack(classicalApp);

    const ConciseS3Stack = C(cdk.Stack, (def) => {
      def`bucket-id`(s3.Bucket, {
        encryption: s3.BucketEncryption.KMS,
      });
    });
    const ConciseApp = C(cdk.App, (def) => {
      def`stack-id`(ConciseS3Stack);
    });
    const conciseAppStacks = new ConciseApp().synth().stacks;

    classicalApp.synth().stacks.forEach((e, i) => {
      expect(e?.template).toStrictEqual(conciseAppStacks[i]?.template);
    });
  });
});
