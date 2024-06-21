"use client";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../config";
import { useRouter } from "next/navigation";
import { Bento } from "@/app/components/Bento";
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
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
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
        <div className="flex items-center mb-10 gap-20">
          <h1 className="text-4xl font-bold text-lime-500">Bem vindo(a) ao meu portfolio</h1>
          <button
            onClick={handleLogout}
            className="shadow-[inset_0_0_0_2px_#616467] text-black px-4 py-2 rounded-md tracking-widest font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
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
