import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto/account.dto';
import { AccountService } from '../service/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Body() account: AccountDto): Promise<AccountDto> {
    return this.accountService.create(account);
  }

  @Get()
  async findAll(): Promise<AccountDto[]> {
    return this.accountService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() account: AccountDto): Promise<any> {
    var update = await this.accountService.update(parseInt(id), account);
    if (update)
      return {
        message: 'Account updated successfully',
        account: update,
      };
  }
}
