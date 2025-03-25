"use client";

import { useRouter } from "next/navigation";
import MapView from "./map-view";

interface School {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
}

interface ClientMapWrapperProps {
  schools: School[];
  redirectPath?: string;
}

export default function ClientMapWrapper({
  schools,
  redirectPath = "/school",
}: ClientMapWrapperProps) {
  const router = useRouter();

  const handleSchoolSelect = (id: string) => {
    router.push(`${redirectPath}/${id}`);
  };

  return <MapView schools={schools} onSchoolSelect={handleSchoolSelect} />;
}
