import {Handler} from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log(event);

  return {
    statuscode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
    }),
  };
};
