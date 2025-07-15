import { Link } from "react-router-dom";
import { MessageSquare, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    // <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
    <header className="fixed w-full top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary tracking-tight">
                ChatVibe
              </h1>
              <p className="text-xs text-text-muted -mt-0.5">
                Professional Messaging
              </p>
            </div>
          </Link>

          {authUser && (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {authUser.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt={authUser.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                </div>
                {/* <div className="text-sm">
                  <p className="font-medium text-text-primary leading-none">
                    {authUser.fullName}
                  </p>
                  <p className="text-text-muted leading-none mt-0.5">Online</p>
                </div> */}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent hover:bg-muted transition-colors text-sm font-medium text-text-secondary hover:text-text-primary"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent hover:bg-destructive/10 hover:text-destructive transition-colors text-sm font-medium text-text-secondary"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
