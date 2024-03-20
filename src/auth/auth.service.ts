import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { ITokenResponse } from './interfaces';
import { JwtService } from '@nestjs/jwt';

import { DrizzleDb } from '@/db';
import { User, users } from '@/db/schemas';
import { eq } from 'drizzle-orm';

const ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @Inject('DB') private readonly db: DrizzleDb,
  ) {}
  async signUp(dto: CreateUserDto): Promise<ITokenResponse> {
    const hash = await bcrypt.hash(dto.password, ROUNDS);
    const isUser = await this.db.query.users.findFirst({ where: eq(users.email, dto.email) });

    if (isUser) throw new ForbiddenException('Email already exists');

    await this.db.insert(users).values({
      name: dto.name,
      email: dto.email,
      password: hash,
      lastName: '',
    });

    const user = await this.db.query.users.findFirst({ where: eq(users.email, dto.email)})
    return this.signToken(user);
  }

  async signIn(dto: AuthDto): Promise<ITokenResponse> {
    const user = await this.db.query.users.findFirst({ where: eq(users.email, dto.email) });

    if (!user) throw new ForbiddenException('Email or password invalid');

    if (!(await bcrypt.compare(dto.password, user.password)))
      throw new ForbiddenException('Email or password invalid');

    return this.signToken(user);
  }

  async signToken(user: User): Promise<ITokenResponse> {
    const payload = {
      sub: user.idUser,
      email: user.email,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: this.config.get('JWT_SECRET'),
    });
    return { token };
  }
}
