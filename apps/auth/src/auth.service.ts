import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires,
    });
  }

  async authenticate(token?: string) {
    if (!token) {
      return null;
    }

    try {
      const payload = this.jwtService.verify<TokenPayload>(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      return this.usersService.getUser({ _id: payload.userId });
    } catch {
      return null;
    }
  }
}
