import React, { useState } from 'react';
import { LogIn, LogOut, Loader2, User } from 'lucide-react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../utils/firebase';

export default function AuthButton({ user }) {
  const [loading, setLoading] = useState(false);

  if (!isFirebaseConfigured) {
    return (
      <div className="hidden sm:flex px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-500 items-center">
        Auth Config Missing
      </div>
    );
  }

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign-in failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <button disabled className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-semibold flex items-center gap-2 cursor-wait">
        <Loader2 className="w-4 h-4 animate-spin" />
        Please wait
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800/80 rounded-xl p-1 pr-3">
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-lg object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        )}
        <span className="text-xs font-semibold text-slate-200 hidden sm:block truncate max-w-[100px]">
          {user.displayName || "User"}
        </span>
        <button
          onClick={handleSignOut}
          className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors ml-1"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/20 active:scale-95"
    >
      <LogIn className="w-4 h-4" />
      <span className="hidden sm:inline">Sign In with Google</span>
      <span className="sm:hidden">Sign In</span>
    </button>
  );
}
