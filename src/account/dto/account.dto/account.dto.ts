import { IsArray, IsNumber } from 'class-validator';
import { TransactionDto } from 'src/transaction/dto/transaction.dto';
import { TransactionEntity } from 'src/transaction/entity/transaction.entity';

export class AccountDto {
  @IsNumber()
  id: number;

  @IsNumber()
  balance: number;

  @IsArray()
  transactions: TransactionDto[];
}
