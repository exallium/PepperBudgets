import {NormalizedTransactionBatch} from "@/lib/NormalizedTransactionBatch";
import {Transaction} from "@/lib/Transaction";

/**
 * Represent a batch of transactions. Batches can be one of several
 * types, and they should be able to take input CSV data and normalize
 * it into output data that can be written to a datastore.
 */
export class TransactionBatch {

  private readonly transactions: Transaction[]

  constructor(transactions: Transaction[]) {
    this.transactions = transactions
  }

  normalize(): NormalizedTransactionBatch {
    return new NormalizedTransactionBatch(
      this.transactions.map(item => item.toNormalizedTransaction())
    )
  }
}