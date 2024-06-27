import { HoverEffect } from "@/components/ui/card-hover-effect";

const DashboardPage = () => {
  const items = [
    {
      title: "Add Student",
      description: "Click here to add new students",
      link: "/dashboard/add-student",
    },
    {
      title: "Add Event",
      description: "Click here to add new event details",
      link: "/dashboard/add-certificate",
    },
    {
      title: "Issue Certificate",
      description: "Click here to issue new certificate",
      link: "/dashboard/issue",
    },
    {
      title: "Verify Certificate",
      description: "Click here to verify existing certificate",
      link: "/verify",
    },
    {
      title: "Profile",
      description: "Click here to visit your profile",
      link: "/dashboard/profile",
    },
  ];
  return <HoverEffect items={items} />;
};

export default DashboardPage;
