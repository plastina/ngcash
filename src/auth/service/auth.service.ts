import { Injectable, NotAcceptableException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/service/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (user == null) return null;
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
    const payload = { username: user.username };

    return {
      message: 'Login Successful!',
      username: user.username,
      access_token: sign(payload, 'secretKey', { expiresIn: '1h' }),
    };
  }

  public async refresh(username: string): Promise<string> {
    return sign({ username: username }, 'secretKey', { expiresIn: '1h' });
  }
}
