'use client';

import React from "react";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs";

const PepperLoginLink: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return <LoginLink>{children}</LoginLink>
}

export default PepperLoginLink