import {AppSyncResolverHandler} from "aws-lambda";
import {db, TableName} from "./common";
import * as t from "./generated-types";

export const handler: AppSyncResolverHandler<t.MutationCreateNoteArgs, t.Query["note"]> = async ({arguments: {in: Item}}) => {
  await db.put({TableName, Item}).promise();
  return Item;
};
