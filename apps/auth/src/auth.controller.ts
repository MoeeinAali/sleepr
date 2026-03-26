import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@sleepr/common/constants/services';
import { JwtAuthGuard } from '@sleepr/common';
import { AUTHENTICATE_PATTERN } from '@sleepr/common/constants/patterns';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    schema: {
      properties: { email: { type: 'string' }, password: { type: 'string' } },
    },
  })
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.authService.login(user, res);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(AUTHENTICATE_PATTERN)
  async authenticate(data: { token: string }) {}
}
