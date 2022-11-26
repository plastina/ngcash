import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(user: UserDto): Promise<UserDto> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  

}
