export type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  muted?: boolean;
};

export function TextLink({
  href,
  children,
  external = false,
  muted = false,
}: TextLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`underline underline-offset-2 ${
        muted
          ? "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          : "text-blue-600 hover:text-blue-500 dark:text-blue-400"
      }`}
    >
      {children}
      {external ? " ↗" : null}
    </a>
  );
}
