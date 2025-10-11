import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import type { User } from "@/lib/firebase";

export const MainLayout = ({ user }: { user: User | null }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar user={user} />
      <main id="main-content" className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
