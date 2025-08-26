"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1 className="poppins">hello world</h1>
      <Button onClick={() => router.push("/about-us")}>About us</Button>
    </div>
  );
}
