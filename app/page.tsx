import {DI} from "@/lib/DI";
import H1 from "@/components/atoms/H1";
import BudgetRow from "@/components/molecules/BudgetRow";

export default async function Home() {

  // 1. Get all categories
  // 2. Get transactions which happened within the last month for each.

  const dashboardData = await DI.dataStore.getDashboardData()

  return (
    <div className="flex flex-col flex-wrap content-center">
      <H1>Dashboard</H1>

      <div className="border-collapse w-full max-w-3xl text-sm m-4">
        {dashboardData.categories.map(category => (
          <BudgetRow key={category.id} amountSpent={dashboardData.transactions[category.id] ?? 0} category={category} />
        ))}
        <BudgetRow amountSpent={dashboardData.transactions[0] ?? 0} />
      </div>
    </div>
  )
}
