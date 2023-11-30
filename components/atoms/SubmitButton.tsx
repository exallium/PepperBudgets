'use client'

import {useFormStatus} from "react-dom";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import React, {ReactNode} from "react";

const SubmitButton: React.FC<{
  children: ReactNode
}> = ({children}) => {
  const  { pending } = useFormStatus()

  return <PrimaryButton type="submit" aria-disabled={pending}>{children}</PrimaryButton>
}

export default SubmitButton