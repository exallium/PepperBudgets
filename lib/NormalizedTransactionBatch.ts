import {NormalizedTransaction} from "@/lib/NormalizedTransaction";
import DataStore from "@/lib/DataStore";

/**
 * Collection of NormalizedAccountTransactions which can be
 * persisted to a backing datastore.
 */
export class NormalizedTransactionBatch {

  private readonly normalizedTransactions: NormalizedTransaction[]

  constructor(normalizedTransactions: NormalizedTransaction[]) {
    this.normalizedTransactions = normalizedTransactions
  }

  write(dataStore: DataStore) {
    dataStore.writeTransactions(this.normalizedTransactions)
  }
}