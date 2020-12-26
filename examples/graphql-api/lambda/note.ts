import {AppSyncResolverHandler} from "aws-lambda";
import {db, TableName} from "./common";
import * as t from "./generated-types";

export const handler: AppSyncResolverHandler<t.QueryNoteArgs, t.Query["note"]> = async ({arguments: {id}}) => {
  try {
    const {Item} = await db.get({TableName, Key: {id}}).promise();
    return Item as t.Query["note"];
  } catch (e) {}
};
