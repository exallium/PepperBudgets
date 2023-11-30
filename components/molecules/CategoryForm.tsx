import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import React from "react";
import {Category} from "@prisma/client";

const CategoryForm: React.FC<{
  category?: Category
}> = ({ category }) => {
  return (
    <div className="w-full max-w-sm">
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="category-name">Category Name</InlineFormLabel>
          <InlineFormInput id="category-name" name="title" defaultValue={category?.title ?? ""} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="budget">Budget</InlineFormLabel>
          <InlineFormInput id="budget" name="budget" defaultValue={category?.budget?.toString() ?? ""} />
        </>
      </InlineFormItem>
    </div>
  )
}

export default CategoryForm