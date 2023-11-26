import {Account, PrismaClient, Transaction} from "@prisma/client";

export class PrismaDataStore {

  private readonly prismaClient = new PrismaClient()

  writeTransactions(transactions: Transaction[]): void {
    // Write each to the database
    this.prismaClient.transaction.createMany(
      {
        data: transactions
      }
    )
  }

  async getAccountById(accountId: number): Promise<Account | null> {
    return this.prismaClient.account.findUnique({
      where: {
        id: accountId
      }
    })
  }
}