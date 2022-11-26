import { TransactionEntity } from 'src/transaction/entity/transaction.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  balance: number;

  @OneToMany(
    () => TransactionEntity,
    (transaction) =>
      transaction.debitedAccountId || transaction.creditedAccountId,
  )
  transactions: TransactionEntity[];
}
