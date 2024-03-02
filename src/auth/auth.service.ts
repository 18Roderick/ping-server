import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ITokenResponse } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: CreateUserDto): Promise<ITokenResponse> {
    try {
      const hash = await bcrypt.hash(dto.password, ROUNDS);
      const userData: Prisma.UsersCreateInput = {
        name: dto.name,
        email: dto.email,
        password: hash,
        lastName: '',
      };

      const user = await this.prisma.users.create({
        data: userData,
      });

      return this.signToken(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async signIn(dto: AuthDto): Promise<ITokenResponse> {
    const user = await this.prisma.users.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new ForbiddenException('Email or password invalid');

    if (!(await bcrypt.compare(dto.password, user.password)))
      throw new ForbiddenException('Email or password invalid');

    return this.signToken(user);
  }

  async signToken(user: Users): Promise<ITokenResponse> {
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
