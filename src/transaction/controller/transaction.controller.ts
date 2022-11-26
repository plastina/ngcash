import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from 'src/account/service/account.service';
import { TransactionDto } from '../dto/transaction.dto';
import { TransactionEntity } from '../entity/transaction.entity';
import { TransactionService } from '../service/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() transaction: TransactionDto): Promise<TransactionEntity> {
    transaction.createdAt = new Date();
    return this.transactionService.executeTransaction(transaction);
  }

  @Get()
  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll();
  }
}
