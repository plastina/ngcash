import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto/user.dto';
import { UserEntity } from '../entity/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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
}
