import { Schema } from 'effect';

export class NotFoundError extends Schema.TaggedError<NotFoundError>()('NotFoundError', {
  message: Schema.String,
}) {}

export class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
  'UnauthorizedError',
  { message: Schema.String },
) {}

export class ForbiddenError extends Schema.TaggedError<ForbiddenError>()('ForbiddenError', {
  message: Schema.String,
}) {}

export class DbError extends Schema.TaggedError<DbError>()('DbError', {
  cause: Schema.Defect,
}) {}

export class QueueError extends Schema.TaggedError<QueueError>()('QueueError', {
  cause: Schema.Defect,
}) {}

export class PingError extends Schema.TaggedError<PingError>()('PingError', {
  message: Schema.String,
}) {}
