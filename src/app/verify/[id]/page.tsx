"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";

export default function IdPage() {
  const [data, setData] = useState<any>();
  const params = useParams();
  const { id } = params;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const getCertificateInfo = async () => {
      const certificateInfo = await fetch("/api/verify-certificate", {
        headers: {
          certificateId: id as string,
        },
      });

      const data = await certificateInfo.json();
      if (certificateInfo.ok) {
        setData(data);
      } else {
        console.log(data.message);
      }
    };
    getCertificateInfo();
  }, [id]);

  useEffect(() => {
    if (data && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw certificate background
      ctx.fillStyle = "#f5f5f5";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw certificate border with shadow
      ctx.shadowColor = "#888";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "#333";
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Draw certificate title
      ctx.font = "bold 28px Arial";
      ctx.fillStyle = "#333";
      ctx.fillText("Certicheck", 50, 50);

      // Draw horizontal line separator
      ctx.beginPath();
      ctx.moveTo(30, 70);
      ctx.lineTo(canvas.width - 30, 70);
      ctx.strokeStyle = "#888";
      ctx.stroke();

      // Draw certificate details
      ctx.font = "italic 20px Arial";
      ctx.fillText("Event Name: " + data.event.name, 50, 100);

      ctx.font = "bold 20px Arial";
      ctx.fillText("Certificate ID:", 50, 150);
      ctx.fillText(data.certificate.id, 200, 150);

      ctx.fillText("Organizer:", 50, 190);
      ctx.fillText(data.owner.name, 200, 190);

      ctx.fillText("Student:", 50, 230);
      ctx.fillText(data.student.name, 200, 230);

      ctx.fillText("Roll No:", 50, 270);
      ctx.fillText(data.student.rollNo, 200, 270);

      // Draw certificate validity
      ctx.fillStyle = "green";
      ctx.font = "italic 24px Arial";
      ctx.fillText("Certificate's credentials has been verified", 50, 320);
    }
  }, [data]);

  function download() {
    const canvas = canvasRef.current!;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${id}.png`;
    link.href = url;
    link.click();
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} width={600} height={400}></canvas>
      {data && <Button onClick={download}>Download as PNG</Button>}
    </div>
  );
}
