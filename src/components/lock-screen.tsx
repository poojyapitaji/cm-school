import { Button, Input } from "@nextui-org/react";

import { DoubleRightArrow, Lock } from "./icons";

const LockScreen = () => {
  return (
    <div className="relative h-screen w-screen animate-fade animate-ease-out">
      <div className="h-full w-full z-10 bg-white dark:bg-black" />
      <div className="z-20 absolute top-0 left-0 h-full w-full flex flex-col gap-3 justify-center items-center">
        <Lock size={50} />
        <h1>Lock Screen</h1>
        <Input
          className="w-1/3 text-center"
          endContent={
            <Button
              className="mb-[0.1rem]"
              color="primary"
              endContent={<DoubleRightArrow />}
              radius="full"
              size="sm"
            />
          }
          label="Enter password to continue"
          type="password"
        />
      </div>
    </div>
  );
};

export default LockScreen;
