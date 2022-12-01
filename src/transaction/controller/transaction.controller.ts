import { Body, Controller, Get, Post} from '@nestjs/common';
import { ExecuteTransactionDto} from '../dto/transaction.dto';
import { TransactionEntity } from '../entity/transaction.entity';
import { TransactionService } from '../service/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  create(
    @Body() transaction: ExecuteTransactionDto,
  ): Promise<TransactionEntity> {
    return this.transactionService.executeTransaction(transaction);
  }

  @Get()
  async findAll(): Promise<TransactionEntity[]> {
    return this.transactionService.findAll();
  }
}
