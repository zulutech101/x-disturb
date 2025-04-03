"use client"

import LoginPage from "@/components/Login";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/dashboard");
  };

  return <LoginPage onSuccess={handleLoginSuccess} />;
}
