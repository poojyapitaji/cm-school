import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

import { CloseEye, OpenEye } from "@/components/icons";
import { title } from "@/components/primitives";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <form className="relative w-full md:w-[450px] p-[50px] flex flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small md:left-[40px] top-1/2 -translate-y-1/2 backdrop-blur-sm">
      <h1 className={`${title()} mb-4`}>Log In 👋</h1>
      <Input
        isClearable
        isRequired
        label="Email Address"
        placeholder="Enter yout email"
        variant="bordered"
      />
      <Input
        isRequired
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <OpenEye className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <CloseEye className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        label="Password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />
      <Button color="primary" variant="solid">
        Log In
      </Button>
    </form>
  );
};

export default Login;
