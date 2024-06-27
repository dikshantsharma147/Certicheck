"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyCertificatePage() {
  const [certificate, setCertificate] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast, dismiss } = useToast();
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    const certificateInfo = await fetch("/api/verify-certificate", {
      headers: {
        certificateId: certificate,
      },
    });

    const data = await certificateInfo.json();
    if (certificateInfo.ok) {
      const toastID = toast({
        title: "Certificate Valid",
        description: "Redirecting to Info Page",
      });

      setTimeout(() => {
        dismiss(toastID.id);
        router.push(`/verify/${certificate}`);
      }, 2000);
    } else {
      const toastID = toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });

      setTimeout(() => {
        dismiss(toastID.id);
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <Card className="px-6 py-3 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Verify Certificate By ID</h1>

      <div className="flex flex-col gap-2">
        <Label htmlFor="certID">Certificate ID</Label>
        <Input
          type="text"
          className="w-[350px]"
          id="certID"
          placeholder="Certificate ID"
          onChange={(e) => setCertificate(e.target.value)}
          disabled={loading}
        />
      </div>
      <Button onClick={handleClick}>
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Verify
      </Button>
    </Card>
  );
}
