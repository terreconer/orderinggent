interface IButton {
  title: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  value?: string | number;
  name?: string;
  className?: string;
  onClickHandler?(): void
}

export const Button: React.FC<IButton> = ({
  title,
  type,
  disabled,
  value,
  name,
  className,
  onClickHandler,
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        value={value}
        name={name}
        className={className}
        onClick={onClickHandler}
      >
        {title}
      </button>
    </>
  );
};
