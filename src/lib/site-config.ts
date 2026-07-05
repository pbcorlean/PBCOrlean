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
  // TODO: replace with the church's actual social media page URLs
  social: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ] satisfies SocialLink[],
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Service Times", href: "/service-times" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Give", href: "/give" },
];

export const serviceTimes: ServiceTime[] = [
  {
    name: "Sunday Service",
    day: "Sunday",
    time: "11:00 AM - 1:00 PM",
    description: "Held on the first four Sundays of each month.",
  },
  {
    name: "Bible Study",
    day: "Wednesday",
    time: "7:00 PM",
    description: "Midweek study and prayer gathering for the whole family.",
  },
];
