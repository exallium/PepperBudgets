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

  async createAccount(
    title: string,
    descriptionField: string,
    dateField: string,
    amountField: string
  ) {
    return this.prismaClient.account.create({
      data: {
        amount_field: amountField,
        date_field: dateField,
        description_field: descriptionField,
        title: title
      }
    })
  }

  async getAllAccounts() {
    return this.prismaClient.account.findMany()
  }

  async getAccountById(accountId: number): Promise<Account | null> {
    return this.prismaClient.account.findUnique({
      where: {
        id: accountId
      }
    })
  }

  async createCategory(title: string, budget: number) {
    return this.prismaClient.category.create({
      data: {
        title: title,
        budget: budget
      }
    })
  }

  async getAllCategories() {
    return this.prismaClient.category.findMany()
  }
}