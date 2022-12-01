import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './strategy/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    var user = this.authService.validateUser(
      req.body.username,
      req.body.password,
    );
    if (user != null) return this.authService.login(user);
    else
      return {
        message: 'Invalid username or password',
      };
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req): Promise<any> {
    return this.authService.refresh(req.username);
  }
}
