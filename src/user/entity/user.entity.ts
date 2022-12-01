import { AccountEntity } from 'src/account/entity/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @OneToOne(() => AccountEntity, { nullable: false })
  @JoinColumn({ name: 'accountId' })
  accountId: AccountEntity;
}
