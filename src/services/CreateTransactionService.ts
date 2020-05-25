import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {

    if(!['income', 'outcome'].includes(type)) {
      throw Error('Invalid transaction type');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw Error('Insufficient funds');
    }

    const transaction = this.transactionsRepository.create({ title, type, value});

    return transaction;
  }
}

export default CreateTransactionService;
