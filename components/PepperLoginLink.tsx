'use client';

import React from "react";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs";

const PepperLoginLink: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return <LoginLink className="p-2 rounded bg-green-600 dark:bg-green-200 text-white">{children}</LoginLink>
}

export default PepperLoginLink