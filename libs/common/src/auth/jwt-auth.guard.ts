import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { AUTHENTICATE_PATTERN } from '../constants/patterns';
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send(AUTHENTICATE_PATTERN, {
        Authentication: jwt,
      })
      .pipe(
        tap((response) => {
          context.switchToHttp().getRequest().user = response;
        }),
        map(() => true),
      );
  }
}
