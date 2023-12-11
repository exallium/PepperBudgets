import {Account, Prisma, PrismaClient} from "@prisma/client";
import TransactionCreateManyInput = Prisma.TransactionCreateManyInput;
import TransactionUpdateInput = Prisma.TransactionUpdateInput;
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import AccountUpdateInput = Prisma.AccountUpdateInput;
import PatternCreateInput = Prisma.PatternCreateInput;

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

  updateTransaction(id: number, transaction: TransactionUpdateInput) {
    return this.prismaClient.transaction.update(
      {
        where: {
          id: id
        },
        data: transaction
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
      },
      orderBy: {
        date: "asc"
      }
    })
  }

  async getTransactionById(
    transactionId: number
  ) {
    return this.prismaClient.transaction.findUnique({
      where: {
        id: transactionId
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

  async updateAccount(id: number, account: AccountUpdateInput) {
    return this.prismaClient.account.update(
      {
        data: account,
        where: {
          id: id
        }
      }
    )
  }

  async getAllAccounts() {
    return this.prismaClient.account.findMany({
      orderBy: {title: "asc"}
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

  async updateCategory(id: number, category: CategoryUpdateInput) {
    return this.prismaClient.category.update(
      {
        data: category,
        where: {
          id: id
        }
      }
    )
  }

  async getCategoryById(id: number) {
    return this.prismaClient.category.findUnique({
      where: {
        id: id
      },
      include: {
        pattern: true
      }
    })
  }

  async getAllCategories() {
    return this.prismaClient.category.findMany({
      orderBy: {title: "asc"}
    })
  }

  async createPattern(args: PatternCreateInput) {
    return this.prismaClient.pattern.create({
      data: args
    })
  }
}