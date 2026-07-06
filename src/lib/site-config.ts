export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceTime {
  name: string;
  day: string;
  time: string;
  description?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Providence Baptist Church",
  shortName: "Providence Baptist",
  tagline: "Growing in Faith, Rooted in Love",
  description:
    "A welcoming church family in Orlean serving God and our community through worship, fellowship, and outreach.",
  address: {
    street: "7111 Leeds Manor Road",
    city: "Orlean",
    state: "VA",
    zip: "20128",
  },
  phone: "540-364-1284",
  email: "info@pbcorlean.org",
  givingUrl: "https://give.tithe.ly/?formId=78e6290b-81ee-4301-90c5-dde3eae2683d",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/ProvidenceBaptistChurchOrleanVA" },
  ] satisfies SocialLink[],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Service Times", href: "/service-times" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Give", href: "/give" },
];

export const serviceTimes: ServiceTime[] = [
  {
    name: "Sunday School",
    day: "Sunday",
    time: "10:00 AM - 11:00 AM",
    description: "Held on the 1st, 2nd, and 3rd Sundays of the month.",
  },
  {
    name: "Sunday Service",
    day: "Sunday",
    time: "11:00 AM - 1:00 PM",
    description: "Held on the 1st, 2nd, and 3rd Sundays of the month.",
  },
  {
    name: "Sunday Service (4th Sunday)",
    day: "Sunday",
    time: "10:00 AM",
    description: "Service starts earlier on the fourth Sunday of the month.",
  },
  {
    name: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM",
    description: "Midweek study and prayer gathering for the whole family.",
  },
];

// Note: there is no service on a fifth Sunday, when a month has one.
export const fifthSundayNote =
  "On months with a fifth Sunday, there is no service that day.";
