import { IsArray, IsNumber } from 'class-validator';
import { TransactionDto } from 'src/transaction/dto/transaction.dto';

export class AccountDto {
  @IsNumber()
  id: number;

  @IsNumber()
  balance: number;

  @IsArray()
  transactions: TransactionDto[];
}
