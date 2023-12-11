import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import React from "react";
import {Account, Tag} from "@prisma/client";

const TagForm: React.FC<{
  tag?: Tag
}> = ({tag}) => {
  return (
    <div className="w-full max-w-sm">
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="tag-name">Tag Name</InlineFormLabel>
          <InlineFormInput id="tag-name" name="title" defaultValue={tag?.title ?? ""} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="hide-from-budget">Hide from budget</InlineFormLabel>
          <input id="hide-from-budget" name="hide-from-budget" type="checkbox" defaultChecked={tag?.hide_from_budget ?? false} value={"hide"} />
        </>
      </InlineFormItem>
    </div>
  )
}

export default TagForm