import { Link } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut, Sparkles } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header className="fixed w-full top-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:scale-105 transition-transform group"
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:pulse-glow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-primary">
                ChatVibe
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Modern Messaging
              </p>
            </div>
          </Link>

          {authUser && (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="glass hover:bg-white/20 px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Profile</span>
              </Link>

              <button
                className="glass hover:bg-destructive/20 hover:text-destructive px-4 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
                onClick={logout}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
