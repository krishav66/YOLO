// user.controller.ts
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Post('register')
  async register(@Request() req) {
    try {
      const result = await this.authService.register(req.body);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    try {
      const result = await this.authService.login(req.user);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Post('logout')
  async logout(@Request() req) {
    try {
      req.logout();
      return { success: true, message: 'Logout successful' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
