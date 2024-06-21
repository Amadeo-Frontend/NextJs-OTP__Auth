"use client";
import Login from "@/app/login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("./dashboard");
      }
    });
  }, [auth, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <div className="border border-gray-500 p-8 rounded-xl flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-10">Firebase OTP Sing-in</h1>
        <Login />
      </div>
    </main>
  );
}
