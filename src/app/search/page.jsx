import { Suspense } from "react";
import SearchClient from "./search-client";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10">Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
