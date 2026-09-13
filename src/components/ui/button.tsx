import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground shadow-ticket-button hover:bg-primary-strong focus-visible:ring-primary",
    secondary:
      "border border-border-strong bg-card text-card-foreground hover:bg-accent focus-visible:ring-ring",
  };

  return (
    <button
      type={type}
      className={`inline-flex min-h-12 items-center justify-center rounded-button px-4 text-sm font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}