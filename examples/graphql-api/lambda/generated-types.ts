export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Note = {
  __typename?: 'Note';
  id: Scalars['ID'];
  name: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  note?: Maybe<Note>;
  notes: Array<Note>;
};


export type QueryNoteArgs = {
  id: Scalars['String'];
};

export type CreateNoteInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  completed: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNote?: Maybe<Note>;
  deleteNote?: Maybe<Scalars['String']>;
};


export type MutationCreateNoteArgs = {
  in: CreateNoteInput;
};


export type MutationDeleteNoteArgs = {
  id: Scalars['String'];
};
