import { HttpApiBuilder } from '@effect/platform';
import { Effect } from 'effect';

import { Api } from '@/Http/Api';
import { QueuePingService } from '@/Queue/QueuePing';
import { RemoveTaskResponse } from '@/Queue/Task.schema';

export const TaskHandlersLive = HttpApiBuilder.group(Api, 'Task', (handlers) =>
  Effect.gen(function* () {
    const queuePing = yield* QueuePingService;

    return handlers
      .handle('getJobSchedulers', () => queuePing.getJobSchedulers())
      .handle('getJobSchedulerByServerId', ({ path }) =>
        queuePing.getJobSchedulerByServerId(path.id),
      )
      .handle('removeJobScheduler', ({ path }) =>
        queuePing
          .removeJobScheduler(path.id)
          .pipe(Effect.map((removed) => new RemoveTaskResponse({ removed }))),
      );
  }),
);
