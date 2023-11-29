import {Prisma} from "@prisma/client";
import {PrismaDataStore} from "@/lib/store/PrismaDataStore";
import TransactionCreateManyInput = Prisma.TransactionCreateManyInput;

/**
 * Collection of NormalizedAccountTransactions which can be
 * persisted to a backing datastore.
 */
export class TransactionBatch {

  private readonly normalizedTransactions: TransactionCreateManyInput[]

  constructor(normalizedTransactions: TransactionCreateManyInput[]) {
    this.normalizedTransactions = normalizedTransactions
  }

  async write(dataStore: PrismaDataStore) {
    return dataStore.writeTransactions(this.normalizedTransactions)
  }
}