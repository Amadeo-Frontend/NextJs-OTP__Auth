"use client";

import React, { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { app } from "@/app/config";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { BackgroundBeams } from "./components/ui/background-beams";
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response: string) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setPhoneNumber("");
      toast.success("OTP foi enviado", { position: "top-center" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      if (!confirmationResult) throw new Error("No confirmation result");
      await confirmationResult.confirm(otp);
      setOtp("");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 z-50">
        {!otpSent ? (
          <div id="recaptcha-container" className="rounded-md"></div>
        ) : null}
        <input
          type="tel"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="+55 DDD telefone"
          className={`border-2 border-gray-300 p-2 rounded-md ${isFocused? 'bg-blue-100 text-black' : 'bg-white text-gray-700'}`}
        />
        <input
          type="text"
          value={otp}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleOTPChange}
          placeholder="Insira o código OTP"
          className={`border-2 border-gray-300 p-2 rounded-md ${isFocused? 'bg-blue-100 text-black' : 'bg-white text-gray-700'}`}
        />
        <button
          onClick={otpSent ? handleOTPSubmit : handleSendOtp}
          className={`bg-${
            otpSent ? "green" : "blue"
          }-500 text-white p-2 rounded-md m-2`}
          style={{ backgroundColor: otpSent ? "green" : "blue" }}
        >
          {otpSent ? "Inserir OTP" : "Enviar OTP"}
        </button>
      </div>
      <BackgroundBeams />
      <ToastContainer />
    </>
  );
};

export default Login;
