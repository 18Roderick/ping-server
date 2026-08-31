import { Schema } from 'effect';

export class UpdateUserInput extends Schema.Class<UpdateUserInput>('UpdateUserInput')({
  name: Schema.optional(Schema.String.pipe(Schema.minLength(4), Schema.maxLength(255))),
}) {}
