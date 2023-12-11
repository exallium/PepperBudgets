import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import {Transaction} from "@prisma/client";
import InlineFormSelect from "@/components/atoms/InlineFormSelect";
import React from "react";

const TransactionUpdateForm: React.FC<{
  transaction: Transaction & { date: string },
  categories: { value: number, label: string }[]
}> = ({transaction, categories}) => {
  return (
    <div className="w-full max-w-sm">
      <input type="hidden" name="id" value={transaction.id}/>
      <input type="hidden" name="accountId" value={transaction.accountId}/>
      <input type="hidden" name="date" value={transaction.date}/>
      <input type="hidden" name="amount" value={transaction.amount}/>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="description">Description</InlineFormLabel>
          <InlineFormInput id="description" name="description" defaultValue={transaction.description}/>
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="category-id">Category</InlineFormLabel>
          <InlineFormSelect id="category-id" options={[{value: 0, label: "---"}].concat(categories)} name="categoryId"/>
        </>
      </InlineFormItem>
    </div>
  )
}

export default TransactionUpdateForm