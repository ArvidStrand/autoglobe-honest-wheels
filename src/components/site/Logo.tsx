import logo from "@/assets/logo.asset.json";

export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Auto Globe AS"
      className={className}
      width={180}
      height={80}
    />
  );
}
