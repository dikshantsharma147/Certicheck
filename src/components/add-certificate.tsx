"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";

const AddCertificate = () => {
  const [name, setName] = useState("");
  const { toast, dismiss } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = localStorage.getItem("user")!;
    const parsedUser = JSON.parse(user);
    const response = await fetch("/api/add-event", {
      method: "POST",
      body: JSON.stringify({ userId: parsedUser.id, name }),
    });

    const data = await response.json();
    if (response.ok) {
      const toastId = toast({
        title: "Successful",
        description: "Event added successfully",
      });

      setName("");

      setTimeout(() => {
        dismiss(toastId.id);
      }, 3000);
    } else {
      const toastId = toast({
        title: "Failed",
        description: data.message,
        variant: "destructive",
      });

      setTimeout(() => {
        dismiss(toastId.id);
      }, 3000);
    }
  };

  return (
    <Card className="z-10 py-4 px-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Add Event</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Event Name</Label>
          <Input
            type="text"
            id="name"
            placeholder="Jashan 2K24"
            className="w-[350px]"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Add Now
        </Button>
      </form>
    </Card>
  );
};

export default AddCertificate;
