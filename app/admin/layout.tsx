import { requireAdmin } from "@/utils/auth/admin";
import AdminShell from "../component/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <AdminShell>{children}</AdminShell>;
}