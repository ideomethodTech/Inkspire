export const HERO_CONTENT = {
  headline: {
    line1: "Bring Your Mood",
    line2: "To Your Walls",
  },
  subtitle: "Discover posters that reflect you",
  cta: {
    label: "Explore Collection",
    href: "/collections",
  },
};
export const HERO_FRAMES_BASE = [
  {
    key: "frame-f",
    src: "/assets/asset/Frame-f.jpg",
    alt: "hero frame f",
    width: 340,
    height: 207,
    className:
      "absolute left-[-34px] top-[-17px] scale-75 sm:scale-90 lg:scale-80 hidden md:block",
  },
  {
    key: "frame-i",
    src: "/assets/asset/Frame-i.jpg",
    alt: "hero frame i",
    width: 250,
    height: 220,
    className:
      "absolute left-[500px] top-[-17px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
  {
    key: "frame-c",
    src: "/assets/asset/Frame-c.jpg",
    alt: "hero frame c",
    width: 185,
    height: 180,
    className:
      "absolute left-[855px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
  {
    key: "frame-d",
    src: "/assets/asset/Frame-d.jpg",
    alt: "hero frame d",
    width: 398,
    height: 335,
    className:
      "absolute left-[1020px] scale-70 sm:scale-85 lg:scale-80 origin-top-left hidden md:block",
  },
  {
    key: "frame-e",
    src: "/assets/asset/Frame-e.jpg",
    alt: "hero frame e",
    width: 185,
    height: 209,
    className:
      "absolute top-[219px] left-[1180px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
  {
    key: "frame-b",
    src: "/assets/asset/Frame-b.jpg",
    alt: "hero frame b",
    width: 546,
    height: 295,
    className:
      "absolute top-[420px] left-[1020px] scale-70 sm:scale-85 lg:scale-60 hidden md:block",
  },
  {
    key: "frame-a",
    src: "/assets/asset/Frame-a.jpg",
    alt: "hero frame a",
    width: 400,
    height: 204,
    className:
      "absolute top-[250px] left-[-1px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
   {
    key: "frame-g",
    src: "/assets/asset/Frame-g.jpg",
    alt: "hero frame g",
    width: 162,
    height: 220,
    className:
      "absolute top-[400px] left-[400px] scale-70 sm:scale-85 lg:scale-70 hidden md:block",
  },
  
  {
    key: "frame-h",
    src: "/assets/asset/Frame-h.png",
    alt: "hero frame h",
    width: 128,
    height: 128,
    className:
      "absolute top-[490px] left-[310px] rotate-[-1deg] scale-70 sm:scale-85 lg:scale-70 hidden md:block",
  },
];

export const HERO_FRAMES_BASE_2 = [
  {
    key: "frame-ii",
    src: "/assets/asset/frame-ii.jpg",
    alt: "hero frame ii",
    height: 207,
    width: 350,
    className:
      "absolute top-[-230px]  left-[-60px] scale-75 sm:scale-90 lg:scale-70 hidden md:block",
  },
  {
    key: "frame-j",
    src: "/assets/asset/frame-j.jpg",
    alt: "hero frame j",
    width: 250,
    height: 220,
    className:
      "absolute top-[-180px] left-[350px] scale-80 sm:scale-95 lg:scale-90 hidden md:block",
  },
  {
    key: "frame-k",
    src: "/assets/asset/frame-k.png",
    alt: "hero frame k",
    width: 185,
    height: 180,
    className:
      "absolute top-[-140px]  left-[788px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
  {
    key: "frame-l",
    src: "/assets/asset/frame-l.jpg",
    alt: "hero frame l",
    width: 450,
    height: 335,
    className:
      "absolute top-[-128px] left-[950px] scale-60 sm:scale-65 lg:scale-60 origin-top-left hidden md:block",
  },
  {
    key: "frame-m",
    src: "/assets/asset/frame-m.jpg",
    alt: "hero frame m",
    width: 185,
    height: 209,
    className:
      "absolute top-[182px] left-[1070px] scale-70 sm:scale-85 lg:scale-60 hidden md:block",
  },
  {
    key: "frame-n",
    src: "/assets/asset/frame-n.jpg",
    alt: "hero frame n",
    width: 546,
    height: 295,
    className:
      "absolute top-[430px] left-[790px] scale-70 sm:scale-85 lg:scale-70 hidden md:block",
  },
  {
    key: "frame-o",
    src: "/assets/asset/frame-o.png",
    alt: "hero frame o",
    width: 200,
    height: 204,
    className:
      "absolute top-[448px] left-[370px] scale-70 sm:scale-85 lg:scale-70 hidden md:block",
  },
  {
    key: "frame-p",
    src: "/assets/asset/frame-p.png",
    alt: "hero frame p",
    width: 162,
    height: 220,
    className:
      "absolute top-[430px] left-[260px] rotate-[25deg]  scale-40 sm:scale-40 lg:scale-45 hidden md:block",
  },
  
  {
    key: "frame-q",
    src: "/assets/asset/frame-q.jpg",
    alt: "hero frame q",
    width: 228,
    height: 128,
    className:
      "absolute top-[290px] left-[-23px] scale-70 sm:scale-85 lg:scale-80 hidden md:block",
  },
];
export const HERO_FRAMES = [
  // First stack (visible)
  ...HERO_FRAMES_BASE.map((frame, order) => ({
    ...frame,
    id: `${frame.key}-1`,
    stack: 0,
    order,
    className: `
      ${frame.className}
      top-0
    `,
  })),

  // Second stack (below screen)
  ...HERO_FRAMES_BASE_2.map((frame, order) => ({
    ...frame,
    id: `${frame.key}-2`,
    stack: 1,
    order,
    className: `
      ${frame.className}
      top-[100vh]
    `,
  })),
];
