import { Effect, Schema } from 'effect';
import { HttpRouter, HttpServerResponse } from '@effect/platform';

import { CurrentUser } from '@/Auth/CurrentUser';
import { PingsService } from '@/Pings/Pings.service';

const IdParam = Schema.Struct({ id: Schema.String });

export const PingsHttpLive = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    const pings = yield* PingsService;
    const auth = yield* CurrentUser;

    yield* router.get(
      '/pings/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* pings.findAll(id);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.patch(
      '/pings/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* pings.update(id);
        return yield* HttpServerResponse.json({ result });
      }),
    );

    yield* router.del(
      '/pings/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* pings.remove(id);
        return yield* HttpServerResponse.json({ result });
      }),
    );
  }),
);
