import { AccountEntity } from 'src/account/entity/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  @JoinColumn()
  debitedAccountId: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  @JoinColumn()
  creditedAccountId: AccountEntity;

  @Column()
  value: number;

  @Column()
  createdAt: Date;
}
