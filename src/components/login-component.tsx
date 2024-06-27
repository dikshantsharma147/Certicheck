"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast, dismiss } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      const toastId = toast({
        title: "Login successful",
        description: "Redirecting to Dasboard",
      });
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {
        dismiss(toastId.id);
        router.push("/dashboard");
      }, 2000);
    } else {
      const toastId = toast({
        title: "Login failed",
        description: data.message,
        variant: "destructive",
      });
      setTimeout(() => {
        dismiss(toastId.id);
      }, 3000);
      setLoading(false);
    }
  };

  return (
    <Card className="z-10 py-4 px-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Login Now</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="sample@xmail.com"
            className="w-[350px]"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="********"
            className="w-[350px]"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginComponent;
