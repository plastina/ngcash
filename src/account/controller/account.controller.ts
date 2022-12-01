import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { AccountDto } from '../dto/account.dto/account.dto';
import { AccountService } from '../service/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() account: AccountDto): Promise<AccountDto> {
    return this.accountService.create(account);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async update(@Param('id') id, @Body() account: AccountDto): Promise<any> {
    var update = await this.accountService.update(parseInt(id), account);
    if (update)
      return {
        message: 'Account updated successfully',
        account: update,
      };
  }

  @Get('balance/:id')
  @UseGuards(JwtAuthGuard)
  async findBalanceByAccountId(@Param('id') id): Promise<any> {
    var account = await this.accountService.findById(parseInt(id));
    if (account)
      return {
        balance: account.balance,
      };
  }
}
