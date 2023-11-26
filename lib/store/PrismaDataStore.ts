import DataStore from "@/lib/store/DataStore";
import {PrismaClient, Transaction} from "@prisma/client";

class PrismaDataStore implements DataStore {

  private readonly prismaClient = new PrismaClient()

  writeTransactions(transactions: Transaction[]): void {
    // Write each to the database
    this.prismaClient.transaction.createMany(
      {
        data: transactions
      }
    )
  }
}