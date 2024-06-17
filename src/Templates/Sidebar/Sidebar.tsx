import { ReactNode } from "react";

interface ISideBarProps {
  children: ReactNode;
  onClose(): void;
}

export const Sidebar: React.FC<ISideBarProps> = ({ children, onClose }: ISideBarProps) => {
  return (
    <div className="
      absolute
      top-0
      right-0
      bottom-0
      w-full
      flex
      justify-end
      items-center
      bg-black
      bg-opacity-50
    ">
      <div
        className="absolute top-0 right-1/2 bg-rose-500 p-2 cursor-pointer"
        onClick={onClose}
      >
        X
      </div>
      {children}
    </div>
  );
};
