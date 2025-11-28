// components/LayoutWrapper.tsx
"use client";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  const pathname = usePathname();
  const hideHeader = pathname === "/login";

  return (
    <>
      {!hideHeader && <Header userName={userName} />}
      {children}
    </>
  );
}
