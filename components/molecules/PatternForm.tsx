import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import React from "react";
import {Category, Pattern} from "@prisma/client";

const PatternForm: React.FC<{
  categoryId: string,
  pattern?: Pattern
}> = ({ categoryId, pattern }) => {
  return (
    <div className="w-full max-w-sm">
      <input type="hidden" name="categoryId" value={categoryId} />
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="pattern">Pattern</InlineFormLabel>
          <InlineFormInput id="pattern" name="pattern" defaultValue={pattern?.pattern?.toString() ?? ""} />
        </>
      </InlineFormItem>
    </div>
  )
}

export default PatternForm