import { getServerSession } from "next-auth";
import { authConfig } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DiscoverPage from "@/components/dicover";

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (!session?.accessToken) redirect("/");

  return <DiscoverPage />;
}
