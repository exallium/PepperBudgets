import React from "react";
import PepperLoginLogoutLink from "@/components/molecules/PepperLoginLogoutLink";
import H1 from "@/components/atoms/H1";
import PepperNavigationBarPages from "@/components/molecules/PepperNavigationBarPages";

const PepperNavigationBar: React.FC = () => {
  return (
    <nav className="flex bg-gray-700">
      <div className="flex content-center">
        <H1 className={"text-white p-2 self-center"}><a href="/">Pepper Budgets</a></H1>
      </div>
      <PepperNavigationBarPages />
      <div className="flex-grow"/>
      <div className="flex p-2">
        <PepperLoginLogoutLink/>
      </div>
    </nav>
  )
}

export default PepperNavigationBar