import {DI} from "@/lib/DI";

export default async function CategoriesPage() {
  const transactionCount = await DI.dataStore.getTransactionCount()
  if (transactionCount == 0) {
    return <p>No transactions!</p>
  }

  // TODO -- paging
  const transactions = await DI.dataStore.getTransactions({
    limit: 10,
    offset: 0
  })

  return <div>
    {
      transactions.map(transaction => (<p key={transaction.id}>{transaction.description}</p>))
    }
  </div>
}