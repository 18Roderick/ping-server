import { Effect } from 'effect';
import { HttpRouter, HttpServerRequest, HttpServerResponse } from '@effect/platform';

import { AuthService } from '@/Auth/Auth.service';
import { SignInInput, SignUpInput } from '@/Auth/Auth.schema';

export const AuthHttpLive = HttpRouter.Default.use((router) =>
  Effect.gen(function* () {
    const auth = yield* AuthService;

    yield* router.post(
      '/auth/signup',
      Effect.gen(function* () {
        const input = yield* HttpServerRequest.schemaBodyJson(SignUpInput);
        const result = yield* auth.signUp(input);
        return yield* HttpServerResponse.json(result);
      }),
    );

    yield* router.post(
      '/auth/signin',
      Effect.gen(function* () {
        const input = yield* HttpServerRequest.schemaBodyJson(SignInInput);
        const result = yield* auth.signIn(input);
        return yield* HttpServerResponse.json(result);
      }),
    );
  }),
);
