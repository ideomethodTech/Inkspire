"use client";


import MoodToday from "@/components/posters/MoodToday";
import ToBegin from "@/components/posters/ToBegin";
import Featured from "@/components/posters/Featured";
import TiltedGallery from "@/components/posters/Collection";




export default function PostersPage() {
  return (
    <main>
      <MoodToday />
      <ToBegin />  
     <Featured />
    <TiltedGallery />
    </main>
  );
}
