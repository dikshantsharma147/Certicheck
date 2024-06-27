"use client";

import CertificatesDrawer from "@/components/certificates-drawer";
import EventsDrawer from "@/components/events-drawer";
import StudentsDrawer from "@/components/students-drawer";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

type response = {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
  students: {
    id: string;
    name: string;
    rollNo: string;
    userId: string | null;
  }[];
  events: {
    id: string;
    name: string;
    userId: string | null;
  }[];
  certificates: {
    id: string;
    eventID: string;
    studentID: string;
    userId: string | null;
  }[];
};

export default function ProfilePage() {
  const [data, setData] = useState<response | null>(null);

  const getProfileInfo = async () => {
    const user = localStorage.getItem("user")!;
    const parsedUser = JSON.parse(user);
    const profile = await fetch("/api/get-profile", {
      headers: {
        userId: parsedUser.id,
      },
    });
    const data = await profile.json();
    setData(data);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  if (!data) {
    return (
      <Skeleton className="w-[400px] h-[100px] flex flex-col items-center rounded-md">
        <Skeleton className="w-[200px] h-[40px] my-2" />
        <Skeleton className="w-[200px] h-[40px] my-2" />
      </Skeleton>
    );
  }

  return (
    <Card className="flex flex-col items-center gap-2 px-6 py-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <p>Hi, {data?.user.name}</p>
      <div className="flex gap-4">
        <StudentsDrawer data={data?.students} organization={data?.user.name} />
        <EventsDrawer data={data?.events} organization={data?.user.name} />
        <CertificatesDrawer
          data={data?.certificates}
          organization={data?.user.name}
        />
      </div>
    </Card>
  );
}
