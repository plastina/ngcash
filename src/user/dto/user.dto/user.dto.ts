import { IsNumber, IsSemVer, IsString } from 'class-validator';
import { AccountDto } from 'src/account/dto/account.dto/account.dto';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsNumber()
  accountId: AccountDto;
}
