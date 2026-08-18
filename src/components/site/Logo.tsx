import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";

export function Logo({
  className = "h-9 w-auto",
  variant = "dark",
}: {
  className?: string;
  /** "dark" = mørk logo for lyse flater, "light" = hvit logo for mørke flater */
  variant?: "dark" | "light";
}) {
  return (
    <img
      src={variant === "light" ? logoLight : logoDark}
      alt="Auto Globe AS – bruktbilforhandler i Torp ved Sandefjord"
      className={className}
      width={900}
      height={351}
      decoding="async"
    />
  );
}
