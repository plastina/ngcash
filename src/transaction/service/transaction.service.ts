import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/service/account.service';
import { Repository } from 'typeorm';
import { ExecuteTransactionDto } from '../dto/transaction.dto';
import { TransactionEntity } from '../entity/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private readonly accountService: AccountService,
  ) {}

  async executeTransaction(
    transaction: ExecuteTransactionDto,
  ): Promise<TransactionEntity> {
    const debitedAccount = await this.accountService.findById(
      transaction.debitedAccount,
    );

    const atualizeDebitedAccount = await this.accountService.updateBalance(
      transaction.debitedAccount,
      debitedAccount.balance + transaction.amount,
    );

    if (atualizeDebitedAccount == null) return null;

    const creditedAccount = await this.accountService.findById(
      transaction.creditedAccount,
    );

    const atualizeCreditedAccount = await this.accountService.updateBalance(
      transaction.creditedAccount,
      creditedAccount.balance - transaction.amount,
    );

    if (atualizeCreditedAccount == null) return null;

    return await this.transactionRepository.save({
      debitedAccount: transaction.debitedAccount,
      creditedAccount: transaction.creditedAccount,
      value: transaction.amount,
      createdAt: new Date(),
    });
  }

  async findAll(): Promise<TransactionEntity[]> {
    return await this.transactionRepository.find();
  }
}
