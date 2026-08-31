import { Effect, Schema } from 'effect';
import { HttpRouter, HttpServerRequest, HttpServerResponse } from '@effect/platform';

import { CurrentUser } from '@/Auth/CurrentUser';
import { ServersService } from '@/Servers/Servers.service';
import { CreateServerInputSchema, UpdateServerInput } from '@/Servers/Servers.schema';

const IdParam = Schema.Struct({ id: Schema.String });

export const ServersHttpLive = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    const servers = yield* ServersService;
    const auth = yield* CurrentUser;

    yield* router.get(
      '/servers',
      Effect.gen(function* () {
        const user = yield* auth.authenticate;
        const result = yield* servers.getUserServers(user.sub);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.get(
      '/servers/:id',
      Effect.gen(function* () {
        const user = yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* servers.getServer(user.sub, id);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.post(
      '/servers',
      Effect.gen(function* () {
        const user = yield* auth.authenticate;
        const input = yield* HttpServerRequest.schemaBodyJson(CreateServerInputSchema);
        const result = yield* servers.create(input, user.sub);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.put(
      '/servers/:id',
      Effect.gen(function* () {
        const user = yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const input = yield* HttpServerRequest.schemaBodyJson(UpdateServerInput);
        const result = yield* servers.updateUserServer(id, user.sub, input);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.del(
      '/servers/:id',
      Effect.gen(function* () {
        const user = yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        yield* servers.deleteServer(id, user.sub);
        return yield* HttpServerResponse.json({ deleted: true });
      }),
    );
  }),
);
