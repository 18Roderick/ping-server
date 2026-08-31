import { Context, Effect, Layer } from 'effect';
import { HttpServerRequest } from '@effect/platform';

import { Jwt, type JwtPayload } from '@/Auth/Jwt';
import { UnauthorizedError } from '@/Errors';

/**
 * Trusts the JWT payload directly (sub/email) instead of re-querying the user
 * by email on every request, as the old JwtStrategy did. Full user rows are
 * fetched at the DB boundary only when a handler actually needs them.
 */
export class CurrentUser extends Context.Tag('CurrentUser')<
  CurrentUser,
  {
    readonly authenticate: Effect.Effect<
      JwtPayload,
      UnauthorizedError,
      HttpServerRequest.HttpServerRequest
    >;
  }
>() {}

export const CurrentUserLive = Layer.effect(
  CurrentUser,
  Effect.gen(function* () {
    const jwtService = yield* Jwt;

    const authenticate = Effect.gen(function* () {
      const request = yield* HttpServerRequest.HttpServerRequest;
      const header = request.headers['authorization'];

      if (!header || !header.startsWith('Bearer ')) {
        return yield* new UnauthorizedError({ message: 'Missing bearer token' });
      }

      return yield* jwtService.verify(header.slice('Bearer '.length));
    });

    return { authenticate };
  }),
);
