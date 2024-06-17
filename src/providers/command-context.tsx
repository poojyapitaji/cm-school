import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ElementType,
  ReactNode,
} from "react";

type Command = "SAVE" | "UPDATE" | "DELETE" | "CANCEL";

type CommandConfig = {
  command: Command;
  callback: () => void;
  icon: ReactNode | ElementType;
};

type CommandContextProps = {
  isActive: boolean;
  commands: CommandConfig[];
  addCommand: (commandConfig: CommandConfig) => void;
  removeCommand: (command: Command) => void;
};

const CommandContext = createContext<CommandContextProps | undefined>(
  undefined
);

export const useCommandContext = () => {
  const context = useContext(CommandContext);

  if (!context) {
    throw new Error("useCommandContext must be used within a CommandProvider");
  }

  return context;
};

interface CommandProviderProps {
  initialCommands?: CommandConfig[];
  children: ReactNode;
}

export const CommandProvider: React.FC<CommandProviderProps> = ({
  initialCommands = [],
  children,
}) => {
  const [commands, setCommands] = useState<CommandConfig[]>(initialCommands);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(commands.length > 0);
  }, [commands]);

  const addCommand = (commandConfig: CommandConfig) => {
    setCommands((prevCommands) => [...prevCommands, commandConfig]);
  };

  const removeCommand = (command: Command) => {
    setCommands((prevCommands) =>
      prevCommands.filter((cmd) => cmd.command !== command)
    );
  };

  return (
    <CommandContext.Provider
      value={{ isActive, commands, addCommand, removeCommand }}
    >
      {children}
    </CommandContext.Provider>
  );
};
