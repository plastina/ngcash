import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { UserDto } from '../dto/user.dto/user.dto';
import { AccountUserDto, UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() user: UserDto): Promise<UserDto> {
    return await this.userService.create(user);
  }

  @Post('createAccountAndUser')
  async createAccountAndUser(
    @Body() accountUser: AccountUserDto,
  ): Promise<any> {
    var register = await this.userService.createUserAndAccountRegister(
      accountUser,
    );
    if (register)
      return {
        message: 'User and Account created successfully',
        account: register,
      };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }
}
