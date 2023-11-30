import {Account, Prisma, PrismaClient, Transaction} from "@prisma/client";
import TransactionCreateManyInput = Prisma.TransactionCreateManyInput;

interface PrismaTransactionsPageQuery {
  limit: number,
  offset: number
}

export class PrismaDataStore {

  private readonly prismaClient = new PrismaClient()

  writeTransactions(transactions: TransactionCreateManyInput[]) {
    // Write each to the database
    return this.prismaClient.transaction.createMany(
      {
        data: transactions
      }
    )
  }

  async getTransactions(
    query: PrismaTransactionsPageQuery
  ) {
    return this.prismaClient.transaction.findMany({
      skip: query.offset,
      take: query.limit,
      include: {
        category: true
      }
    })
  }

  async getTransactionCount() {
    return this.prismaClient.transaction.count()
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
    return this.prismaClient.account.findMany({
      select: {
        id: true,
        title: true
      }
    })
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