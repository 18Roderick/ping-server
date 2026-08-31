import { HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import { Schema } from 'effect';

import { Authorization } from '@/Auth/CurrentUser';
import { IdParam } from '@/Http/Params';
import { RemoveTaskResponse } from '@/Queue/Task.schema';

export const TaskGroup = HttpApiGroup.make('Task')
  .add(HttpApiEndpoint.get('getJobSchedulers', '/task').addSuccess(Schema.Unknown))
  .add(
    HttpApiEndpoint.get('getJobSchedulerByServerId', '/task/:id')
      .setPath(IdParam)
      .addSuccess(Schema.Unknown),
  )
  .add(
    HttpApiEndpoint.del('removeJobScheduler', '/task/:id')
      .setPath(IdParam)
      .addSuccess(RemoveTaskResponse),
  )
  .middleware(Authorization);
