import { createServer } from 'node:http';
import { Effect, Layer } from 'effect';
import { HttpMiddleware, HttpRouter, HttpServer, HttpServerResponse } from '@effect/platform';
import { NodeHttpServer } from '@effect/platform-node';

import { AppConfig } from '@/Config';
import { AuthHttpLive } from '@/Auth/Auth.http';
import { UsersHttpLive } from '@/Users/Users.http';
import { ServersHttpLive } from '@/Servers/Servers.http';
import { PingsHttpLive } from '@/Pings/Pings.http';
import { TaskHttpLive } from '@/Queue/Task.http';
import type { ForbiddenError, NotFoundError, PingError, UnauthorizedError } from '@/Errors';

const RoutesLive = Layer.mergeAll(
  AuthHttpLive,
  UsersHttpLive,
  ServersHttpLive,
  PingsHttpLive,
  TaskHttpLive,
).pipe(Layer.provideMerge(HttpRouter.Default.Live));

const AppLive = Layer.unwrapEffect(
  Effect.gen(function* () {
    const router = yield* HttpRouter.Default.router;

    const handled = router.pipe(
      HttpRouter.catchTags({
        RouteNotFound: () => HttpServerResponse.json({ error: 'Not found' }, { status: 404 }),
        NotFoundError: (e: NotFoundError) =>
          HttpServerResponse.json({ error: e.message }, { status: 404 }),
        UnauthorizedError: (e: UnauthorizedError) =>
          HttpServerResponse.json({ error: e.message }, { status: 401 }),
        ForbiddenError: (e: ForbiddenError) =>
          HttpServerResponse.json({ error: e.message }, { status: 403 }),
        DbError: () => HttpServerResponse.json({ error: 'Internal server error' }, { status: 500 }),
        QueueError: () =>
          HttpServerResponse.json({ error: 'Internal server error' }, { status: 500 }),
        PingError: (e: PingError) => HttpServerResponse.json({ error: e.message }, { status: 502 }),
      }),
      HttpRouter.catchAll((error: unknown) =>
        HttpServerResponse.json({ error: 'Bad Request', details: String(error) }, { status: 400 }),
      ),
    );

    const app = yield* HttpRouter.toHttpApp(handled);
    return HttpServer.serve(app, (self) => HttpMiddleware.cors()(HttpMiddleware.logger(self)));
  }),
).pipe(Layer.provide(RoutesLive));

export const HttpServerLive = Layer.unwrapEffect(
  Effect.gen(function* () {
    const config = yield* AppConfig;
    return AppLive.pipe(
      Layer.provide(NodeHttpServer.layer(() => createServer(), { port: config.port })),
    );
  }),
);
