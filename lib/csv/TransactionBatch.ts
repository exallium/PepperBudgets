import DataStore from "@/lib/store/DataStore";
import {Transaction} from "@prisma/client";

/**
 * Collection of NormalizedAccountTransactions which can be
 * persisted to a backing datastore.
 */
export class TransactionBatch {

  private readonly normalizedTransactions: Transaction[]

  constructor(normalizedTransactions: Transaction[]) {
    this.normalizedTransactions = normalizedTransactions
  }

  write(dataStore: DataStore) {
    dataStore.writeTransactions(this.normalizedTransactions)
  }
}