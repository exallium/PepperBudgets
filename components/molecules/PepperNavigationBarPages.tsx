'use client';

import React, {ReactNode, useMemo} from "react";
import {usePathname} from "next/navigation";

const PepperNavigationBarPage: React.FC<{
  href: string
  children: ReactNode
}> = (
  {href, children}
) => {
  const pathname = usePathname()
  const isActive = useMemo(() => (pathname.startsWith(href)), [href, pathname])

  return isActive ? (
    <a href={href}
       className="self-center bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
       aria-current="page">
      {children}
    </a>
  ) : (
    <a href={href}
       className="self-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
      {children}
    </a>
  )
}

const PepperNavigationBarPages = () => {
  return (
    <div className="flex space-x-4 m-2">
      <PepperNavigationBarPage href="/accounts">Accounts</PepperNavigationBarPage>
      <PepperNavigationBarPage href="/categories">Categories</PepperNavigationBarPage>
      <PepperNavigationBarPage href="/transactions">Transactions</PepperNavigationBarPage>
      <PepperNavigationBarPage href="/tags">Tags</PepperNavigationBarPage>
    </div>
  )
}

export default PepperNavigationBarPages