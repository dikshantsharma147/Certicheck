"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useRouter } from "next/navigation";

type Certificate = {
  id: string;
  eventID: string;
  studentID: string;
  userId: string | null;
};

const CertificatesDrawer = ({
  data,
  organization,
}: {
  data: Certificate[] | undefined;
  organization: string;
}) => {
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/verify/${id}`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"lg"}>Certificates</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Certificates</DrawerTitle>
          <DrawerDescription>
            <Table>
              <ScrollArea className="h-[400px] w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Certificate ID</TableHead>
                    <TableHead>Event ID</TableHead>
                    <TableHead className="text-right">Student ID</TableHead>
                    <TableHead className="text-right">Organization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data!.map((item) => (
                    <TableRow
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                    >
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.eventID}</TableCell>
                      <TableCell className="text-right">
                        {item.studentID}
                      </TableCell>
                      <TableCell className="text-right">
                        {organization}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </ScrollArea>
            </Table>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="destructive">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CertificatesDrawer;
