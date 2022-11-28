import { Injectable, NotAcceptableException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import { UserDto } from 'src/user/dto/user.dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }
  async login(user: any) {
    console.log('login user >>', user);
    const payload = { username: user.username, id: user.id };
    return {
      message: 'Login Successful!',
      username: user.username,
      access_token: this.jwtService.sign(payload, { algorithm: 'HS256' }),
    };
  }

  public async refresh(username: string): Promise<string> {
    return this.jwtService.sign({ username: username });
  }
}
