import React from "react";

// ============================
// Headlines
// ============================
export const HeadlineXL = ({ children, className = "" }) => {
  return (
    <h1
      className={`text-[80px] font-normal leading-[100%] font-['Alata'] ${className}`}
    >
      {children}
    </h1>
  );
};

export const Headline = ({ children, className = "" }) => {
  return (
    <h1
      className={`
        text-[54px]
        
        uppercase
        leading-[100%]
        ${className}
        font-[var(--font-poppins)]
      `}
    >
      {children}
    </h1>
  );
};


export const Subheading1 = ({ children, className = "" }) => {
  return (
    <h2
      className={`text-[48px] font-medium leading-[100%] uppercase font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </h2>
  );
};

export const Subheading2 = ({ children, className = "" }) => {
  return (
    <h3
      className={`text-[33px] leading-[100%] uppercase font-[var(--font-poppins)]
 ${className}`}
    >
      {children}
    </h3>
  );
};

// ============================
// Body text
// ============================
export const Body1 = ({ children, className = "" }) => {
  return (
    <p
      className={`text-[22px] font-medium leading-[100%] font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </p>
  );
};

export const Body2 = ({ children, className = "" }) => {
  return (
    <p
      className={`text-[18px] font-normal leading-[100%] font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </p>
  );
};

export const BodyMD = ({ children, className = "" }) => {
  return (
    <p
      className={`text-[16px] font-medium leading-[100%] font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </p>
  );
};

export const BodySM = ({ children, className = "" }) => {
  return (
    <p
      className={`text-[14px] font-normal leading-[100%] font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </p>
  );
};

export const BodyXS = ({ children, className = "" }) => {
  return (
    <p
      className={`text-[12px] font-light leading-[100%] font-['Helvetica Neue'] ${className}`}
    >
      {children}
    </p>
  );
};

// ============================
// Caption & Label
// ============================
export const Caption = ({ children, className = "" }) => {
  return (
    <p className={`text-[12px] font-normal leading-[100%] ${className}`}>
      {children}
    </p>
  );
};

export const Label = ({ children, className = "" }) => {
  return (
    <span
      className={`text-[10px] font-medium uppercase leading-[100%] ${className}`}
    >
      {children}
    </span>
  );
};

// ============================
// Usage examples
// ============================
// <HeadlineXL>Display Hero</HeadlineXL>
// <Headline>Headline</Headline>
// <Subheading1>Subheading1</Subheading1>
// <Subheading2>Subheading2</Subheading2>
// <Body1>Body1 text</Body1>
// <Body2>Body2 text</Body2>
// <BodyMD>Medium body text</BodyMD>
// <BodySM>Small body text</BodySM>
// <BodyXS>Extra small body text</BodyXS>
// <Caption>Caption text</Caption>
// <Label>Label text</Label>
