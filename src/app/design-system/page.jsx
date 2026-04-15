"use client";

import React from "react";
import { Headline, Subheading2, Body1, HeadlineXL,Subheading1, Label,Body2,Caption} from "@/components/typography";
 import Swatch from "./components/Swatch";

import Button from "@/components/ui/Buttons";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui";
import { AlertTriangle } from "lucide-react";

export default function DesignSystemPage () {
 return (
  
    <main className="ds-container">
      <Headline className="mb-6">Design system</Headline>
    {/* Colors Section */}
        <section className="mb-8">
          <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
    Colors
  </Subheading2>
  <div className="max-w-3xl">
     {/* Primary Colors */}
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Primary</Body1>
      <div className="flex gap-4 flex-wrap">
        <Swatch color="bg-[#FFFFFF]" value="#FFFFFF" />
       
      </div>
    </div>
     {/* Secondary Colors */}
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Secondary</Body1>
      <div className="flex gap-4 flex-wrap">
       
        <Swatch color="bg-[#000000]" value="#000000" />
        <Swatch color="bg-[#F7F7F7]" value="#F7F7F7" />
        
      </div>
      </div>
    {/* Accent / Text Color */}
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Accent</Body1>
      <div className="flex gap-4 flex-wrap">
        <Swatch color="bg-[#E11B1B]" value="#E11B1B" />          
     
      </div>
    </div>
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Text Color</Body1>
      <Swatch color="bg-[#000000]" value="#000000" />
       <Swatch color="bg-[#20262B]" value="#20262B" />
        <Swatch color="bg-[#6D6D6D]" value="#6D6D6D" />
         <Swatch color="bg-[#B6B6B6]" value="#B6B6B6" />
          <Swatch color="bg-[#FFFFFF]" value="#FFFFFF" />
           <Swatch color="bg-[#E11B1B]" value="#E11B1B" />
    </div>
  </div>
          </section> 
          {/* Typography Section */}
        <section>
          <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
            Typography
          </Subheading2>
          <div className="max-w-3xl flex flex-col gap-4">
            <HeadlineXL>Headline XL</HeadlineXL>
            <Headline>Headline</Headline>
            <Subheading1>Subheading 1</Subheading1>
            <Subheading2>Subheading 2</Subheading2>
            <Body1>
              Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body1>
            <Body2>
              Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body2>
            <Caption>Caption - Lorem ipsum dolor sit amet.</Caption>
            <Label>Label - Lorem ipsum dolor sit amet.</Label>
          </div>
        </section> 
        {/* Alerts Section */}
<section className="mt-12">
  <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
    Alerts
  </Subheading2>
  <div className="max-w-3xl flex flex-col gap-4">
    <div>
      <Body1 className="mb-3 font-bold">Success (Acknowledging)</Body1>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          Your action has been successfully completed.
        </AlertDescription>
      </Alert>
    </div>

    <div>
      <Body1 className="mb-3 font-bold">Warning (Informative)</Body1>
      <Alert variant="warning">
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Please review the details before proceeding further.
        </AlertDescription>
      </Alert>
    </div>

    <div>
      <Body1 className="mb-3 font-bold">Error (Destructive)</Body1>
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later.
        </AlertDescription>
      </Alert>
    </div>
    
    <div>
      <Body1 className="mb-3 font-bold">Dismissible Alert</Body1>
      <Alert onClose={() => console.log("Dismissed")}>
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default dismissible alert.
        </AlertDescription>
      </Alert>
    </div>
  </div>
</section>

        {/* Buttons Section */}
<section className="mt-12">
  <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
    Buttons
  </Subheading2>

  <div className="max-w-3xl">
    {/* Button Variants */}
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Button Variants</Body1>

      <div className="flex flex-wrap gap-4">
        <Button className="bg-[#202125] hover:bg-[#202125] text-white">
          Primary Button
        </Button>

        <Button
          variant="outline"
          className="border-[#202125] text-[#202125] hover:bg-transparent"
        >
          Outline Button
        </Button>
      </div>
    </div>

    {/* Button Sizes */}
    <div className="mb-6">
      <Body1 className="mb-3 font-bold">Button Sizes</Body1>

      <div className="flex flex-wrap gap-4">
        <Button
          size="sm"
          className="bg-[#202125] hover:bg-[#202125] text-white"
        >
          Small
        </Button>

        <Button className="bg-[#202125] hover:bg-[#202125] text-white">
          Default
        </Button>

        <Button
          size="lg"
          className="bg-[#202125] hover:bg-[#202125] text-white"
        >
          Large
        </Button>
      </div>
    </div>

    {/* Button States */}
    <div>
      <Body1 className="mb-3 font-bold">Button States</Body1>

      <div className="flex flex-wrap gap-4">
        <Button
          disabled
          className="bg-[#202125] text-white opacity-50 cursor-not-allowed"
        >
          Disabled
        </Button>
      </div>
      
      <Body1 className="mb-3 font-bold">Link</Body1>
<p>
  This is a sample of a link:{" "}
  <a
    href="#"
    className="font-semibold underline underline-offset-4 text-[#202125] hover:text-[#202125]"
  >
    Example Link
  </a>
</p>

    </div>
  </div>
</section>

  </main>
  
 )
}