import { TransactionDto } from './transaction.dto';

describe('Dto', () => {
  it('should be defined', () => {
    expect(new TransactionDto()).toBeDefined();
  });
});
