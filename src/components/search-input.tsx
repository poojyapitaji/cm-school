import { Input, InputProps } from "@nextui-org/react";

import { SearchIcon } from "@/components/icons";

const SearchInput: React.FC<InputProps> = ({ ...props }) => {
  return (
    <Input
      aria-label={props.placeholder || "Search"}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder={props.placeholder || "Search"}
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      {...props}
    />
  );
};

export default SearchInput;
