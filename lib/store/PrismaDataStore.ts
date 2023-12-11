import {Account, Prisma} from "@prisma/client";
import prisma from "@/lib/store/prisma";
import TransactionCreateManyInput = Prisma.TransactionCreateManyInput;
import TransactionUpdateInput = Prisma.TransactionUpdateInput;
import CategoryUpdateInput = Prisma.CategoryUpdateInput;
import AccountUpdateInput = Prisma.AccountUpdateInput;
import PatternCreateInput = Prisma.PatternCreateInput;
import TagCreateInput = Prisma.TagCreateInput;
import TagUpdateInput = Prisma.TagUpdateInput;
import AccountCreateInput = Prisma.AccountCreateInput;

export class PrismaDataStore {

  writeTransactions(transactions: TransactionCreateManyInput[]) {
    return prisma.$transaction(
      async (tx) => {

        const result = await tx.transaction.createMany({
          data: transactions
        })

        // Inserted result.count entries, so we assume the last COUNT entries are our new ones.
        const ids = await tx.transaction.findMany({
          select: {id: true},
          orderBy: {id: 'desc'},
          take: result.count
        })

        const idList = ids.map(i => (i.id))

        await tx.$executeRaw`UPDATE "Transaction"
                             SET "categoryId" = (SELECT "categoryId"
                                                 FROM "Pattern"
                                                 WHERE "description" LIKE "pattern"
                                                 ORDER BY LENGTH("pattern") DESC LIMIT 1)
                             WHERE "id" IN (${Prisma.join(idList)});`
      }
    )
  }

  updateTransaction(id: number, transaction: TransactionUpdateInput) {
    return prisma.transaction.update(
      {
        where: {
          id: id
        },
        data: transaction
      }
    )
  }

  async getTransactions(
    input?: { take: number, skip: number }
  ) {
    return prisma.transaction.findMany({
      ...input,
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
    return prisma.transaction.findUnique({
      where: {
        id: transactionId
      }
    })
  }

  async getTransactionCount() {
    return prisma.transaction.count()
  }

  async createAccount(
    input: AccountCreateInput
  ) {
    return prisma.account.create({
      data: input
    })
  }

  async updateAccount(id: number, input: AccountUpdateInput) {
    return prisma.account.update(
      {
        data: input,
        where: {
          id: id
        }
      }
    )
  }

  async getAllAccounts() {
    return prisma.account.findMany({
      orderBy: {title: "asc"}
    })
  }

  async getAccountById(accountId: number): Promise<Account | null> {
    return prisma.account.findUnique({
      where: {
        id: accountId
      }
    })
  }

  async createCategory(title: string, budget: number) {
    return prisma.category.create({
      data: {
        title: title,
        budget: budget
      }
    })
  }

  async updateCategory(id: number, category: CategoryUpdateInput) {
    return prisma.category.update(
      {
        data: category,
        where: {
          id: id
        }
      }
    )
  }

  async getCategoryById(id: number) {
    return prisma.category.findUnique({
      where: {
        id: id
      },
      include: {
        pattern: true
      }
    })
  }

  async getAllCategories() {
    return prisma.category.findMany({
      orderBy: {title: "asc"}
    })
  }

  async createPattern(args: PatternCreateInput) {
    return prisma.$transaction(async (tx) => {
      await tx.pattern.create({
        data: args
      })

      await tx.$executeRaw`UPDATE "Transaction"
                           SET "categoryId" = (SELECT "categoryId"
                                               FROM "Pattern"
                                               WHERE "description" LIKE "pattern"
                                               ORDER BY LENGTH("pattern") DESC LIMIT 1)
                           WHERE "categoryId" IS NULL;`
    })
  }

  async updateTag(id: number, input: TagUpdateInput) {
    return prisma.tag.update({
      data: input,
      where: {
        id: id
      }
    })
  }

  async createTag(input: TagCreateInput) {
    return prisma.tag.create({
      data: input
    })
  }

  async getAllTags() {
    return prisma.tag.findMany({
      orderBy: {title: "asc"}
    })
  }

  async getTagById(id: number) {
    return prisma.tag.findUnique({
      where: {
        id: id
      }
    })
  }

  async getDashboardData() {
    // Get this month:
    const now = new Date()
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth() - 1)

    const transactions = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: {amount: true},
      where: {
        date: {
          gte: firstOfMonth
        }
      }
    })

    const initial: {
      [key: number]: number
    } = {}

    const transactionsMap = transactions.reduce((acc, i) => {
      acc[i.categoryId ?? 0] = i._sum.amount!!
      return acc
    }, initial)

    const categories = await this.getAllCategories()

    return {
      categories: categories,
      transactions: transactionsMap
    }
  }
}