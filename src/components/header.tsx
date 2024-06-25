import React from "react";

import { HeaderProps } from "@/types";

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <>
      {Boolean(title) && <h1 className="text-2xl font-bold">{title}</h1>}
      {Boolean(description) && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </>
  );
};
