import { useCommandContext } from "@/providers/command-context";

const CommandBar = () => {
  const { isActive } = useCommandContext();

  if (!isActive) return null;

  return <div className="w-full bg-primary">Command Bar</div>;
};

export default CommandBar;
