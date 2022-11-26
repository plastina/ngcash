import { IsDate, IsNumber } from 'class-validator';
import { AccountDto } from 'src/account/dto/account.dto/account.dto';

export class TransactionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  debitedAccountId: AccountDto;

  @IsNumber()
  creditedAccountId: AccountDto;

  @IsNumber()
  value: number;

  @IsDate()
  createdAt: Date;
}
