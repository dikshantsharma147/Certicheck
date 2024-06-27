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

type Event = {
  id: string;
  name: string;
  userId: string | null;
};

const EventsDrawer = ({
  data,
  organization,
}: {
  data: Event[] | undefined;
  organization: string;
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"lg"}>Events</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Events</DrawerTitle>
          <DrawerDescription>
            <Table>
              <ScrollArea className="h-[400px] w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Event ID</TableHead>
                    <TableHead>Event Name</TableHead>
                    {/* <TableHead className="text-right">Roll No.</TableHead> */}
                    <TableHead className="text-right">Organization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data!.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      {/* <TableCell className="text-right">{item.rollNo}</TableCell> */}
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

export default EventsDrawer;
