"use client";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useToast } from "./ui/use-toast";
import { response } from "@/app/dashboard/(sub-routes)/issue/page";
import Link from "next/link";

const IssueCertificate = ({ data }: { data: response }) => {
  const [event, setEvent] = useState("");
  const [studentName, setStudentName] = useState("");
  const [certificateId, setCertificateId] = useState<string>("");
  const { toast, dismiss } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = localStorage.getItem("user")!;
    const parsedUser = JSON.parse(user);

    if (event === "" || studentName === "") {
      const toastId = toast({
        title: "Failed",
        description: "Please fill all the fields",
        variant: "destructive",
      });

      setTimeout(() => {
        dismiss(toastId.id);
      }, 3000);
      return;
    }

    const response = await fetch("/api/issue-certificate", {
      method: "POST",
      body: JSON.stringify({
        userId: parsedUser.id,
        eventId: event,
        studentId: studentName,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setCertificateId(data.id);
      const toastId = toast({
        title: "Successful",
        description: "Certificate Issued successfully",
      });

      setEvent("");
      setStudentName("");

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
      <h1 className="text-2xl font-semibold">Issue Certificate</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Select value={event} onValueChange={(e) => setEvent(e)}>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Event Name" />
          </SelectTrigger>
          <SelectContent>
            {data.events.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={studentName} onValueChange={(e) => setStudentName(e)}>
          <SelectTrigger className="w-[350px]">
            <SelectValue placeholder="Student Name" />
          </SelectTrigger>
          <SelectContent>
            {data.students.map((student) => (
              <SelectItem key={student.id} value={student.id}>
                {student.name} - {student.rollNo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full">
          Add Now
        </Button>
      </form>
      {certificateId?.length > 0 && (
        <Link
          href={`/verify/${certificateId}`}
          className="text-center hover:underline"
          target="_blank"
        >
          Certificate ID: {certificateId}
        </Link>
      )}
    </Card>
  );
};

export default IssueCertificate;
