'use client';

import React from "react";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs";

const PepperLogoutLink: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return <LogoutLink className="p-2 rounded hover:bg-gray-600 text-white">{children}</LogoutLink>
}

export default PepperLogoutLink