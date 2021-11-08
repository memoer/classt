import { GraphQLFormattedError } from 'graphql';
import * as request from 'supertest';
import { QueryType } from './api-test.builder';

export interface ErrorResponse {
  name: string;
  message: string;
  statusCode: number;
  error: string;
}

export function testDescription(type: QueryType, description: string): string {
  return `${type.toUpperCase()}: ${description}`;
}

export function getDataFromBody<T>(res: request.Response, key: string): T {
  return res.body.data[key];
}

export function getErrorFromBody(res: request.Response): GraphQLFormattedError[] {
  return res.body.errors;
}

export function getExceptionFromError(res: request.Response): ErrorResponse {
  const { extensions } = res.body.errors[0] as GraphQLFormattedError;
  return extensions?.exception;
}
