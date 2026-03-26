import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { AUTHENTICATE_PATTERN } from '../constants/patterns';
import { UserDto } from '../dto/user.dto';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies?.Authentication;

    if (!jwt) {
      throw new UnauthorizedException();
    }

    return this.authClient
      .send<UserDto>(AUTHENTICATE_PATTERN, {
        Authentication: jwt,
      })
      .pipe(
        tap((response) => {
          if (!response) {
            throw new UnauthorizedException();
          }

          request.user = response;
        }),
        map(() => true),
        catchError(() => throwError(() => new UnauthorizedException())),
      );
  }
}
