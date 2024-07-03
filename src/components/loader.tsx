import { Spinner } from "@nextui-org/react";

import { LoaderProps } from "@/types";

const Loader: React.FC<LoaderProps> = ({ opacity, message }) => {
  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen">
      <div
        className="absolute top-0 left-0 h-full w-full inset-0 bg-white dark:bg-black pointer-events-none"
        style={{ opacity: opacity }}
      />
      <div className="relative z-10 h-full w-full flex justify-center items-center flex-col gap-2 text-gray-600 dark:text-gray-300">
        <Spinner size={"lg"} />
        {message}
      </div>
    </div>
  );
};

export default Loader;
