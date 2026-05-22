import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "success" | "danger" | "outline";
  size?: "small" | "large";
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  type = "button",
  variant = "primary",
  size,
  fullWidth = false,
  disabled = false
}) => {
  const classNames = [
    'rounded-pill',
    'w-100',
    'text-uppercase',
    'btn-primary',
    'btn',
    'fw-bold',
    'py-3',
    'px-4',
    'small',
    'border-0',
    'shadow-custom'
  ].filter(Boolean).join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
