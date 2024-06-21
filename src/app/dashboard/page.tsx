"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";
import { Bento } from "@/app/components/bento";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Dashboard: React.FC = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast("Deslogado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="flex min-h-screen flex-col items-center p-12">
        <div className="flex items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-lime-500">Amadeo Bon | Portfolio</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Logout
          </button>
        </div>

        <Bento />
        <Footer/>
      </main>
    </>
  );
};

export default Dashboard;
