import LoadingSpinner from "@/components/common/LoadingSpinner";
import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}
