"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GoPerson } from "react-icons/go";

const Dashboard = () => {
  const { data: session } = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <GoPerson size={22} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="mr-8 p-1 w-48">
        {session ? (
          <div className="font-bold text-center">
            <Link href={"/dashboard"}>Go to Dashboard</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col text-center space-y-2 py-2 px-4">
              <h1 className="text-sm text-red-500 font-bold">
                You're not logged in
              </h1>
              <Button
                onClick={() => signIn("google")}
                className="border border-black rounded-lg"
              >
                Sign in with Google
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Dashboard;
