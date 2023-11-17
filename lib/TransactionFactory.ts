import {Account} from "@/lib/Account";
import {AccountType} from "@/lib/AccountType";
import {BrimTransaction} from "@/lib/BrimTransaction";
import {TransactionBatch} from "@/lib/TransactionBatch";

export class TransactionBatchFactory {

  private static createBrimFinancialTransactionBatch(account_id: number, data: string[]): TransactionBatch {
    const transactions = data.map(row => {
      return new BrimTransaction(
        account_id,
        {
          no: row[0],
          transaction_date: row[1],
          posted_date: row[2],
          description: row[3],
          cardholder: row[4],
          amount: row[5],
          points: row[6],
          category: row[7],
          last_4_digits: row[8]
        }
      )
    })

    return new TransactionBatch(transactions)
  }

  static createTransactionBatch(account: Account, data: string[]): TransactionBatch {
    switch (account.type) {
      case AccountType.TD_CANADA_TRUST:
        throw "not implemented"
      case AccountType.BRIM_FINANCIAL:
        return this.createBrimFinancialTransactionBatch(account.id, data)
      case AccountType.AMERICAN_EXPRESS_CANADA:
        throw "not implemented"
    }
  }
}