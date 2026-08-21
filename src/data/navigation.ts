export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Founder", href: "/founder" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
