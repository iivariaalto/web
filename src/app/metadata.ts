import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DrivingSchool.com - Find the Perfect Driving School Near You",
  description:
    "Compare top-rated driving schools based on reviews, pricing, and available courses to find your perfect match.",
  keywords:
    "driving school, driving lessons, driver education, learn to drive, driving instructor, driving test, car lessons, motorcycle lessons, truck lessons",
  openGraph: {
    title: "DrivingSchool.com - Find the Perfect Driving School Near You",
    description:
      "Compare top-rated driving schools based on reviews, pricing, and available courses to find your perfect match.",
    url: "https://drivingschool.com",
    siteName: "DrivingSchool.com",
    images: [
      {
        url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "DrivingSchool.com",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DrivingSchool.com - Find the Perfect Driving School Near You",
    description:
      "Compare top-rated driving schools based on reviews, pricing, and available courses to find your perfect match.",
    images: [
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=630&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
    yandex: "verification_token",
    yahoo: "verification_token",
  },
};
