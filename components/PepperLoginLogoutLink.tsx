import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import PepperLoginLink from "@/components/PepperLoginLink";
import PepperLogoutLink from "@/components/PepperLogoutLink";

export default async function PepperLoginLogoutLink() {
  const isAuthenticated = await getKindeServerSession().isAuthenticated()

  if (isAuthenticated) {
    return <PepperLogoutLink>Sign Out</PepperLogoutLink>
  } else {
    return <PepperLoginLink>Sign In</PepperLoginLink>
  }
}