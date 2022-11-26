import { TransactionEntity } from './transaction.entity';

describe('Entity', () => {
  it('should be defined', () => {
    expect(new TransactionEntity()).toBeDefined();
  });
});
