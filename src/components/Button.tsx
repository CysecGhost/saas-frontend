interface ButtonProps {
  type?: "button" | "submit" | "reset";
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ type, width, disabled, onClick, className, children }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        className
          ? className
          : `${
              width ? width : "w-1/3"
            } bg-blue-600 py-2 px-4 rounded-full cursor-pointer transition duration-300 hover:bg-blue-700`
      }
    >
      {children}
    </button>
  );
};

export default Button;
