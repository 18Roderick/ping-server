import { Schema } from 'effect';

// BullMQ's job scheduler shape is an external, library-owned type we don't
// model — Schema.Unknown here reflects that honestly rather than guessing.
export class RemoveTaskResponse extends Schema.Class<RemoveTaskResponse>('RemoveTaskResponse')({
  removed: Schema.Boolean,
}) {}
