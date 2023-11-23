'use client';

import React from "react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs";

const PepperLogoutLink: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return <LogoutLink>{children}</LogoutLink>
}

export default PepperLogoutLink