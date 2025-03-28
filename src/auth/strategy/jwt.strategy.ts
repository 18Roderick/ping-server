import { DB } from '@/db';
import { users } from '@/db/schemas';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    @Inject('DB') private readonly db: DB,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { email: string; sub: string }) {
    const user = await this.db
      .select({
        email: users.email,
        id_user: users.id_user,
        name: users.email,
      })
      .from(users)
      .where(eq(users.email, payload.email));
    return user[0];
  }
}
