import React from "react";
import PepperLoginLogoutLink from "@/components/PepperLoginLogoutLink";
import H1 from "@/components/H1";

const PepperNavigationBar: React.FC = () => {
  return (
    <nav className="flex bg-gray-700">
      <div className="flex content-center">
        <H1 className={"text-white p-2"}>Pepper Budgets</H1>
      </div>
      <div className="flex-grow" />
      <div className="flex p-2">
        <PepperLoginLogoutLink />
      </div>
    </nav>
  )
}

export default PepperNavigationBar