"use client";

import LoginComponent from "@/components/login-component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);
  return <LoginComponent />;
};

export default LoginPage;
