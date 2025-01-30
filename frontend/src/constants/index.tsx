import alpine from "../assets/Alpine.png";
import redBull from "../assets/Red-Bull.png";
import samsung from "../assets/Samsung.png";

import twitter from "../assets/Twitter.png";
import facebook from "../assets/Facebook.png";
import instagram from "../assets/Instagram.png";
import github from "../assets/Github.png";
import { type SortMethod } from "../lib/types";

export const navLinks = [
  { href: "#topRating", label: "Top Rating", id: "topRating" },
  { href: "#category", label: "Category", id: "category" },
  { href: "#newsletter", label: "Newsletter", id: "newsletter" },
] as const;

export const stats = [
  { number: "200+", caption: "International Brands" },
  { number: "2,000+", caption: "Hight-Quality Products" },
  { number: "30,000+", caption: "Happy Customers" },
] as const;

export const brands = [
  { name: "calvin klein", img: CK },
  { name: "nike", img: nike },
  { name: "delonghi", img: delonghi },
  { name: "red-bull", img: redBull },
  { name: "alpine", img: alpine },
  { name: "samsung", img: samsung },
];

export const comments = [
  {
    rating: 5,
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations",
  },
  {
    rating: 5,
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    rating: 5,
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    rating: 4,
    name: "Jacob B.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    rating: 3,
    name: "John N.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    rating: 5,
    name: "Lena A.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations",
  },
  {
    rating: 5,
    name: "Hugo K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    rating: 5,
    name: "Joe M.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

export const footerData = [
  {
    title: "Company",
    items: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    items: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    items: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resource",
    items: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
];

export const socials = [
  { name: "twitter", iconIMG: twitter },
  { name: "facebook", iconIMG: facebook },
  { name: "instagram", iconIMG: instagram },
  { name: "github", iconIMG: github },
];

export const defaultProduct = {
  id: 0,
  title: "",
  price: "",
  images: [],
  rating: 0,
  category: "",
  description: "",
  thumbnail: "",
  discountPercentage: 0,
  weight: 0,
  stock: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: "",
  shippingInformation: "",
  reviews: [],
  brand: "",
};

export const sortingOptions: SortMethod[] = [
  "Alphabetical",
  "Hightest Price",
  "Lowest Price",
  "Top Rated",
  "Least Rated",
] as const;

export const sortOptionsMap = {
  Alphabetical: { field: "title" },
  "Hightest Price": { field: "price", direction: "desc" },
  "Lowest Price": { field: "price", direction: "asc" },
  "Top Rated": { field: "rating", direction: "desc" },
  "Least Rated": { field: "rating", direction: "asc" },
} as const;
