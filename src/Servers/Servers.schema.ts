import { Schema } from 'effect';

const urlPattern = /^https?:\/\/[^\s]+$/;
const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;

const UrlField = Schema.String.pipe(Schema.pattern(urlPattern));
const IpField = Schema.String.pipe(Schema.pattern(ipv4Pattern));

export class CreateServerInput extends Schema.Class<CreateServerInput>('CreateServerInput')({
  url: Schema.optional(UrlField),
  ip: Schema.optional(IpField),
  description: Schema.optional(Schema.String),
  title: Schema.String.pipe(Schema.minLength(1)),
}) {}

export const CreateServerInputSchema = CreateServerInput.pipe(
  Schema.filter((input) => (input.url || input.ip ? true : 'Either url or ip is required')),
);

export class UpdateServerInput extends Schema.Class<UpdateServerInput>('UpdateServerInput')({
  url: Schema.optional(UrlField),
  ip: Schema.optional(IpField),
  description: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String.pipe(Schema.minLength(1))),
}) {}
