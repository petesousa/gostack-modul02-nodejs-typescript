import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce((totals, transaction) => {

      const { type, value } = transaction;

      if (type === 'income') totals.income += value;
      if (type === 'outcome') totals.outcome += value;

      return totals;
    }, {
      income: 0,
      outcome: 0
    });

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value});

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
