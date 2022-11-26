import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { AccountService } from 'src/account/service/account.service';
import { TransactionController } from './controller/transaction.controller';
import { TransactionEntity } from './entity/transaction.entity';
import { TransactionService } from './service/transaction.service';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
