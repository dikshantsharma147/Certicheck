"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    const toastId = toast({
      title: "Logout Successful",
      description: "Redirecting to Home Page",
      variant: "default",
    });

    setTimeout(() => {
      dismiss(toastId.id);
      router.push("/");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center relative w-full h-full z-10 gap-8">
      {children}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
