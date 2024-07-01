import React from "react";

import { Delete } from "./icons";

import { ConfirmationCardProps } from "@/types";
import { isValidElementType } from "@/utils";

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({
  icon = Delete,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item?",
}) => {
  return (
    <div className=" w-full">
      <div className="flex flex-col w-full justify-center items-center gap-2 pt-4">
        {isValidElementType(icon) &&
          React.createElement(icon, {
            className:
              "text-danger animate-wiggle animate-thrice animate-duration-[110ms] animate-ease-in-out animate-delay-300",
            size: 60,
          })}
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-md text-gray-500 text-center">{description}</p>
      </div>
    </div>
  );
};

export default ConfirmationCard;
