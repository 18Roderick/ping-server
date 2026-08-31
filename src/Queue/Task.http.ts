import { Effect, Schema } from 'effect';
import { HttpRouter, HttpServerResponse } from '@effect/platform';

import { CurrentUser } from '@/Auth/CurrentUser';
import { QueuePingService } from '@/Queue/QueuePing';

const IdParam = Schema.Struct({ id: Schema.String });

/**
 * Thin introspection/cancellation surface over the ping job schedulers.
 * The original /task/demo, /task/interval and /task/search/:jobId routes were
 * debug scaffolding against fake data (a random UUID, unused job ids) and are
 * dropped rather than ported, per the plan's dead-code cleanup. This module
 * also fixes the original gap where /task had no auth guard at all.
 */
export const TaskHttpLive = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    const queuePing = yield* QueuePingService;
    const auth = yield* CurrentUser;

    yield* router.get(
      '/task',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const result = yield* queuePing.getJobSchedulers();
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.get(
      '/task/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const result = yield* queuePing.getJobSchedulerByServerId(id);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.del(
      '/task/:id',
      Effect.gen(function* () {
        yield* auth.authenticate;
        const { id } = yield* HttpRouter.schemaPathParams(IdParam);
        const removed = yield* queuePing.removeJobScheduler(id);
        return yield* HttpServerResponse.json({ removed });
      }),
    );
  }),
);
