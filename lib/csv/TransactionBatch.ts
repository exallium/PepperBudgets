import {Transaction} from "@prisma/client";
import {PrismaDataStore} from "@/lib/store/PrismaDataStore";

/**
 * Collection of NormalizedAccountTransactions which can be
 * persisted to a backing datastore.
 */
export class TransactionBatch {

  private readonly normalizedTransactions: Transaction[]

  constructor(normalizedTransactions: Transaction[]) {
    this.normalizedTransactions = normalizedTransactions
  }

  async write(dataStore: PrismaDataStore) {
    return dataStore.writeTransactions(this.normalizedTransactions)
  }
}