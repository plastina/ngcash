import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/service/account.service';
import { Repository } from 'typeorm';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionEntity } from '../entity/transaction.entity';

export interface ExecuteTransaction {
  debitedAccount: number;
  creditedAccount: number;
  amount: number;
}

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private readonly accountService: AccountService,
  ) {}

  // async executeTransaction(
  //   transaction: ExecuteTransaction,
  // ): Promise<TransactionEntity> {
    // const debitedAccount = await this.accountService.update(transaction.debitedAccount, {
    //   id: transaction.debitedAccount,
    //   balance: transaction.amount,
    // });
  //   // return await this.transactionRepository.save(transaction);
  // }

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }
}
