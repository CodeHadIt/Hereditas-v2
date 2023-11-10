import {
  CheckCircle2,
  UserCheck2,
  CalendarCheck2,
  HeartHandshake,
} from "lucide-react";

export const homeCardItems = [
  {
    icon: CheckCircle2,
    heading: "Pick Assets",
    paragraph:
      "Select the assests you want to gift to a beneficiary. The Assets can be an ERC20 token or and NFT.",
  },
  {
    icon: UserCheck2,
    heading: "Choose Beneficiary",
    paragraph:
      "You are at liberty to select as many beneficiaries as you want just as you would in a traditional will.",
  },
  {
    icon: CalendarCheck2,
    heading: "Set Release Date",
    paragraph:
      "You pick a date for when the assets will be released to the beneficiary of your choosing. This can be a week, month or year(s).",
  },
  {
    icon: HeartHandshake,
    heading: "Beneficiary Claims Assets",
    paragraph:
      "Upon elapse of the pre-set release date, the assets gifted to a beneficiary gets released to their wallet.",
  },
];

export const statCardItems = [
  { heading: "10M", extra: "+", text: "Total Gifts Facilitated" },
  { heading: "5", extra: "", text: "Active Chains" },
  { heading: "10K", extra: "+", text: "Monthly Active Users" },
];