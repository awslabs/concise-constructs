import {AppSyncResolverHandler} from "aws-lambda";
import {db, TableName} from "./common";
import * as t from "./generated-types";

export const handler: AppSyncResolverHandler<undefined, t.Query["notes"]> = async () => {
  try {
    const {Items} = await db.scan({TableName}).promise();
    return Items as t.Query["notes"];
  } catch (e) {
    return [];
  }
};
