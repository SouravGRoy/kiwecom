"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  console.log("Session Data:", session);
  return (
    <div>
      <div className="bg-white py-8 flex justify-between px-28">
        <div className="logo">
          <Link href="/" className="flex">
            <h1 className="font-['NeueMontreal-Regular'] z-20 font-semibold text-4xl">
              kíwë
            </h1>
            <Image
              src="/LOGOX.png"
              className="-ml-6 z-10"
              width={70}
              height={70}
              alt="logo"
            />
          </Link>
        </div>
        <Link href={"/"}>
          <Button variant={"default"} className="py-6 px-6">
            Go To Store
          </Button>
        </Link>
      </div>
      <div className="px-36 py-10 bg-black h-screen">
        <h1 className="text-white mb-6 text-xl">Profile</h1>
        <div className="bg-white px-6 py-6 mb-6 font-semibold rounded-lg  text-gray-600">
          <h1 className="">{session?.user?.id}</h1>
          <h1>{session?.user?.email}</h1>
          <p className="text-black"></p>
        </div>
        <div className="bg-white px-6 py-6 font-semibold rounded-lg  text-gray-600">
          <h1 className="">Address</h1>
          <input type="text" className="border w-full py-6 mt-4 rounded-md" />
          <p className="text-black"></p>
        </div>
        <Button
          onClick={() => signOut({ callbackUrl: `/` })}
          variant={"outline"}
          className="text-black text-md font-semibold mt-6 px-6 py-4"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}
