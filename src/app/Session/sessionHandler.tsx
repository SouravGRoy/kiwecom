"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUserId } from "@/redux/features/cart-slice";

function SessionHandler({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      const userId = session.user.id;
      localStorage.setItem("userId", userId);
      dispatch(setUserId(userId)); // Set the current user ID in the Redux state
    } else if (status === "unauthenticated") {
      // Do not clear the cart from localStorage; just update the state
      dispatch(setUserId(null)); // Clear the Redux userId state
    }
  }, [session, status, dispatch]);

  return <>{children}</>;
}

export default SessionHandler;
