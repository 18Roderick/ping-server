import { Layer } from 'effect';
import { NodeRuntime } from '@effect/platform-node';

import { AppConfigLive } from '@/Config';
import { DbLive } from '@/Db/Db';
import { RedisConnectionLive } from '@/Queue/Connection';
import { JwtLive } from '@/Auth/Jwt';
import { CurrentUserLive } from '@/Auth/CurrentUser';
import { AuthServiceLive } from '@/Auth/Auth.service';
import { UsersServiceLive } from '@/Users/Users.service';
import { PingsServiceLive } from '@/Pings/Pings.service';
import { QueuePingServiceLive } from '@/Queue/QueuePing';
import { QueueManagerServiceLive } from '@/Queue/QueueManager';
import { SchedulerServiceLive } from '@/Jobs/Scheduler';
import { ServersServiceLive } from '@/Servers/Servers.service';
import { HttpServerLive } from '@/Http/Server';

const InfraLive = Layer.mergeAll(DbLive, RedisConnectionLive, JwtLive).pipe(
  Layer.provideMerge(AppConfigLive),
);

const Level2Live = Layer.mergeAll(
  CurrentUserLive,
  QueuePingServiceLive,
  UsersServiceLive,
  PingsServiceLive,
).pipe(Layer.provideMerge(InfraLive));

const Level3Live = Layer.mergeAll(
  AuthServiceLive,
  QueueManagerServiceLive,
  SchedulerServiceLive,
).pipe(Layer.provideMerge(Level2Live));

const AppServicesLive = ServersServiceLive.pipe(Layer.provideMerge(Level3Live));

const MainLive = HttpServerLive.pipe(Layer.provide(AppServicesLive));

NodeRuntime.runMain(Layer.launch(MainLive));
