import {Handler} from "aws-lambda";
import aws from "aws-sdk";

export const handler: Handler = async (event) => {
  console.log("lambda start...");
  console.log("request:", JSON.stringify(event, undefined, 2));
  console.log("We don't end up bundling the `aws-sdk`, few!", aws);

  return {
    statusCode: 200,
    headers: {"Content-Type": "text/plain"},
    body: `Hello concise constructs! The current path is '${event.path}'\n`,
  };
};
