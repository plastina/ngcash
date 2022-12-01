import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import * as bcryptjs from 'bcryptjs';
import { AccountService } from 'src/account/service/account.service';
import { AccountDto } from 'src/account/dto/account.dto/account.dto';

export interface AccountUserDto {
  user: UserDto;
  account: AccountDto;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private accountService: AccountService,
  ) {}

  async create(user: UserDto): Promise<UserDto> {
    user.password = bcryptjs.hashSync(user.password);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async getUser(username: string): Promise<UserDto> {
    return await this.userRepository.findOneBy({ username: username });
  }

  async createUserAndAccountRegister(
    userAccount: AccountUserDto,
  ): Promise<any> {
    var account = await this.accountService.create(userAccount.account);
    userAccount.user.accountId = account;
    var user = await this.create(userAccount.user);
    return {
      username: user.username,
      accountId: account.id,
    };
  }
}
