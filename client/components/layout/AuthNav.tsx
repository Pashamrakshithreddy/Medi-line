import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { auth, signOut, type User } from "@/lib/firebase";

export const AuthNav = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user.email || user.phoneNumber}
          </span>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </div>
  );
};