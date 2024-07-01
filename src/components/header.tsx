import React from "react";

import { HeaderProps } from "@/types";

export const Header: React.FC<HeaderProps> = ({
  title = "",
  description = "",
  startContant = () => null,
  endContant = () => null,
}) => {
  return (
    <div className="flex gap-4 justify-between items-center border-b-1 dark:border-gray-800 pb-3">
      {startContant()}
      <div className="flex flex-col gap-2">
        {Boolean(title) && <h1 className="text-2xl font-bold">{title}</h1>}
        {Boolean(description) && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      {endContant()}
    </div>
  );
};
