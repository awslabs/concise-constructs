import {DynamoDB} from "aws-sdk";

export const db = new DynamoDB.DocumentClient();

export const TableName = process.env.TABLE_NAME as string;
