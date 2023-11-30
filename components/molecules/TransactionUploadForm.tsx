'use client'

import React, {useEffect, useState} from "react";
import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormSelect from "@/components/atoms/InlineFormSelect";
import {useApiData} from "@/components/hooks";

const TransactionUploadForm: React.FC = () => {
  const accounts = useApiData<{id: number, title: string}[]>('/api/accounts')

  if (!accounts) {
    return <p>Loading...</p>
  }

  const options = accounts.map(account => ({
    value: account.id,
    label: account.title
  }))

 return (
   <div className="w-full max-w-sm">
    <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="account">Account</InlineFormLabel>
          <InlineFormSelect id="account" name="accountId" options={options} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="csv">CSV</InlineFormLabel>
          <InlineFormInput id="csv" name="csv" defaultValue='' type='file' />
        </>
      </InlineFormItem>
   </div>
 )
}

export default TransactionUploadForm