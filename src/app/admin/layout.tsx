import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Latheesh Reddy Portfolio",
  description: "Portfolio administration panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
