import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import React from "react";
import {Account} from "@prisma/client";

const AccountForm: React.FC<{
  account?: Account
}> = ({account}) => {
  return (
    <div className="w-full max-w-sm">
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="account-name">Account Name</InlineFormLabel>
          <InlineFormInput id="account-name" name="title" defaultValue={account?.title ?? ""} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="description-field">Description Field</InlineFormLabel>
          <InlineFormInput id="description-field" name="description-field" defaultValue={account?.description_field ?? ""} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="date-field">Date Field</InlineFormLabel>
          <InlineFormInput id="date-field" name="date-field" defaultValue={account?.date_field ?? ""} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="amount-field">Amount Field</InlineFormLabel>
          <InlineFormInput id="amount-field" name="amount-field" defaultValue={account?.amount_field ?? ""} />
        </>
      </InlineFormItem>
    </div>
  )
}

export default AccountForm