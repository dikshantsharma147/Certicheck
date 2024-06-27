"use client";

import IssueCertificate from "@/components/issue-certificates";
import { Skeleton } from "@/components/ui/skeleton";
import { memo, useEffect, useState } from "react";

export type response = {
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

const IssueCertificatePage = () => {
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

  return <IssueCertificate data={data} />;
};

export default memo(IssueCertificatePage);
