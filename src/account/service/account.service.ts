import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountDto } from '../dto/account.dto/account.dto';
import { AccountEntity } from '../entity/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async create(account: AccountDto): Promise<AccountDto> {
    return await this.accountRepository.save(account);
  }

  async findAll(): Promise<AccountDto[]> {
    return await this.accountRepository.find();
  }

  async findById(id: number): Promise<AccountDto> {
    return await this.accountRepository.findOneBy({ id: id });
  }

  async update(id: number, account: AccountDto): Promise<AccountDto> {
    var update = await this.accountRepository.update(id, account);
    var updatedAccount = await this.accountRepository.findOneBy({ id: id });
    if (update.affected > 0) return updatedAccount;
  }

  async updateBalance(id: number, balance: number): Promise<AccountDto> {
    var update = await this.accountRepository
      .createQueryBuilder()
      .update(AccountEntity)
      .set({ balance: balance })
      .where('id = :id', { id: id })
      .execute();

    var updatedAccount = await this.accountRepository.findOneBy({ id: id });
    if (update.affected > 0) return updatedAccount;
    else return null;
  }
}
