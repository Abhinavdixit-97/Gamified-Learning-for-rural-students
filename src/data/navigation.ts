export type NavItem = {
  key: string;
  path: string;
};

export const navItems: NavItem[] = [
  { key: "nav.home", path: "/" },
  { key: "nav.problem", path: "/problem" },
  { key: "nav.solution", path: "/solution" },
  { key: "nav.technology", path: "/technology" },
  { key: "nav.method", path: "/method" },
  { key: "nav.results", path: "/results" },
  { key: "nav.references", path: "/references" },
  { key: "nav.teacher", path: "/teacher" },
  { key: "nav.student", path: "/student" }
];
