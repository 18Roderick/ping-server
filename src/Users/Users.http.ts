import { Effect, Schema } from 'effect';
import { HttpRouter, HttpServerRequest, HttpServerResponse } from '@effect/platform';

import { CurrentUser } from '@/Auth/CurrentUser';
import { UsersService } from '@/Users/Users.service';
import { UpdateUserInput } from '@/Users/Users.schema';

const IdParam = Schema.Struct({ id: Schema.String });

export const UsersHttpLive = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    const users = yield* UsersService;
    const auth = yield* CurrentUser;

    yield* router.get(
      '/user',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const result = yield* users.findAll();
        return yield* HttpServerResponse.json({ result });
      }),
    );

    yield* router.get(
      '/user/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* users.findOne(id);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.patch(
      '/user/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const input = yield* HttpServerRequest.schemaBodyJson(UpdateUserInput);
        const result = yield* users.update(id, input);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.del(
      '/user/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* users.remove(id);
        return yield* HttpServerResponse.json(result);
      }),
    );
  }),
);
