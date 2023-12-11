import React from "react";
import {Category} from "@prisma/client";
import {DI} from "@/lib/DI";
import H2 from "@/components/atoms/H2";

const BudgetRow: React.FC<{
  category?: Category,
  amountSpent: number
}> = ({category, amountSpent}) => {
  const budget = category ? "/" + DI.currencyFormatter.format(category.budget) : ""

  return (
    <div className="w-full flex">
      <H2>{category?.title ?? "Not categorized"}</H2>
      <p>{DI.currencyFormatter.format(amountSpent)}${budget}</p>
    </div>
  )
}

export default BudgetRow