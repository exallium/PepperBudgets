import H1 from "@/components/atoms/H1";
import PrimaryLink from "@/components/atoms/PrimaryLink";
import React from "react";

const TopLevelHeader: React.FC<{
  title: string,
  actionLabel: string,
  actionHref: string
}> = ({title, actionHref, actionLabel}) => {
  return (
    <div className="flex">
      <H1 className="p-4">{title}</H1>
      <div className="flex-grow"></div>
      <PrimaryLink className="mr-4 self-center" href={actionHref}>{actionLabel}</PrimaryLink>
    </div>
  )
}

export default TopLevelHeader