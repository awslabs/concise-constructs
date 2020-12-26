import {AppSyncResolverHandler} from "aws-lambda";
import {db, TableName} from "./util";
import * as t from "./generated-types";

export const handler: AppSyncResolverHandler<t.MutationDeleteNoteArgs, t.Mutation["deleteNote"]> = async ({arguments: {id}}) => {
  try {
    await db.delete({TableName, Key: {id}}).promise();
    return id;
  } catch (e) {}
};
