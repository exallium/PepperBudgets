import {Account, Prisma, PrismaClient} from "@prisma/client";
import TransactionCreateManyInput = Prisma.TransactionCreateManyInput;
import TransactionUpdateInput = Prisma.TransactionUpdateInput;
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import AccountUpdateInput = Prisma.AccountUpdateInput;
import PatternCreateInput = Prisma.PatternCreateInput;
import TagCreateInput = Prisma.TagCreateInput;
import TagUpdateInput = Prisma.TagUpdateInput;

interface PrismaTransactionsPageQuery {
  limit: number,
  offset: number
}

export class PrismaDataStore {

  private readonly prismaClient = new PrismaClient()

  writeTransactions(transactions: TransactionCreateManyInput[]) {
    return this.prismaClient.$transaction(
      async (tx) => {

        const result = await tx.transaction.createMany({
          data: transactions
        })

        // Inserted result.count entries, so we assume the last COUNT entries are our new ones.
        const ids = await tx.transaction.findMany({
          select: { id: true },
          orderBy: { id: 'desc' },
          take: result.count
        })

        const idList = ids.map(i => (i.id))

        await tx.$executeRaw`UPDATE "Transaction" SET "categoryId" = (SELECT "categoryId" FROM "Pattern" WHERE "description" LIKE "pattern" ORDER BY LENGTH("pattern") DESC LIMIT 1) WHERE "id" IN (${Prisma.join(idList)});`
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
    return this.prismaClient.$transaction(async (tx) => {
      await tx.pattern.create({
        data: args
      })

      await tx.$executeRaw`UPDATE "Transaction" SET "categoryId" = (SELECT "categoryId" FROM "Pattern" WHERE "description" LIKE "pattern" ORDER BY LENGTH("pattern") DESC LIMIT 1) WHERE "categoryId" IS NULL;`
    })
  }

  async updateTag(id: number, input: TagUpdateInput) {
    return this.prismaClient.tag.update({
      data: input,
      where: {
        id: id
      }
    })
  }

  async createTag(input: TagCreateInput) {
    return this.prismaClient.tag.create({
      data: input
    })
  }

  async getAllTags() {
    return this.prismaClient.tag.findMany({
      orderBy: {title: "asc"}
    })
  }

  async getTagById(id: number) {
    return this.prismaClient.tag.findUnique({
      where: {
        id: id
      }
    })
  }
}