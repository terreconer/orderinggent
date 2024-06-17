import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction: string;
  className?: string;
};

export const List: React.FC<Props> = ({ children, className, direction = 'horizontal' }) => {
  return (
    <>
      <div className={`list-wrapper ${direction}`}>
        <ul className={`${className} list-items`}>
          {children}
        </ul>
      </div>
    </>
  )
};
