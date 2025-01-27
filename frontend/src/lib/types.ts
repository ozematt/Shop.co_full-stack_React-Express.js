import { z } from "zod";

//// BUTTON TYPES
export type ButtonProps = {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

//// CHECKOUT TYPES
const itemSchema = z.object({
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  quantity: z.number(),
});

export const orderDataSchema = z.object({
  total: z.number(),
  items: z.array(itemSchema),
});

const itemsSchema = z.object({
  title: z.string(),
  image: z.string().url(),
  price: z.number(),
  quantity: z.number(),
});
export const ordersSchema = z.object({
  orderId: z.number(),
  total: z.number(),
  date: z.string(),
  items: z.array(itemsSchema),
});

export type OrdersT = z.infer<typeof ordersSchema>;
export type OrderData = z.infer<typeof orderDataSchema>;

const cartRecord = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  discountPercentage: z.number(),
  image: z.string().url(),
  price: z.number(),
  purchaseTotal: z.number(),
  quantity: z.number(),
  shippingTime: z.string(),
  stock: z.number(),
});

export const cartLocalStorageSchema = z.object({
  entities: z.record(cartRecord),
  ids: z.array(z.number()),
  itemsInCart: z.number(),
  subtotal: z.number(),
  total: z.number(),
});

export const userLocalStorageSchema = z.object({
  id: z.number(),
  username: z.string(),
});
export type UserLocalStorage = z.infer<typeof userLocalStorageSchema>;

//// COMMENT TYPES
export type CommentProps = {
  rating: number;
  name: string;
  text: string;
  date?: string;
};

//// DETAILS TYPES
type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type DetailsProps = {
  brand?: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
};

//// DETAILS BUTTON TYPES
export type DetailsButtonProps = {
  onClick: () => void;
  details: string;
  children: string;
  title: string;
};

////FILTERS TYPES
export type FiltersProps = {
  iconHide?: boolean;
  sortOptions?: boolean;
  close?: () => void;
};

////INPUT TYPES
export type InputProps = {
  icon: string;
  alt: string;
  type: string;
  placeholder: string;
};

//// SIGNUP TYPES
export const signUpSchema = z
  .object({
    username: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(6, { message: "Must be at last 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Must be at last 6 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

////LOGIN TYPES
export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, { message: "Must be 3 or more characters long" })
    .email({ message: "Invalid email" }),

  password: z.string().min(5, { message: "Password is required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

//// MYACCOUNT TYPES
export const ordersLocalStorageSchema = z.array(orderDataSchema);
export type Orders = z.infer<typeof ordersLocalStorageSchema>;

////PAGINATIONBAR TYPES
export type PaginationBarProps = {
  total: number;
  page: number;
};

////PRODUCT TYPES
export type ProductProps = {
  id: number;
  title: string;
  thumbnail?: string;
  price: number;
  rating: number;
  images: string[];
  discountPercentage: number;
  category: string;
  onClick?: () => void;
};

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  images: z.array(z.string()),
  rating: z.number(),
  category: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  discountPercentage: z.number(),
  brand: z.string().optional(),
  weight: z.number(),
  stock: z.number(),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
  }),
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  reviews: z.array(
    z.object({
      rating: z.number(),
      comment: z.string(),
      date: z.string(),
      reviewerName: z.string(),
      reviewerEmail: z.string(),
    }),
  ),
});

export type Product = z.infer<typeof productSchema>;

export const productsFetchedDataSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type ProductsFetchedData = z.infer<typeof productsFetchedDataSchema>;

type SortingOptions = {
  field: string;
  direction?: string;
};

export type SortMethod =
  | "Alphabetical"
  | "Hightest Price"
  | "Lowest Price"
  | "Top Rated"
  | "Least Rated";

export type ProductsInitialState = {
  sortOptions: SortingOptions;
  categoryName: string;
  filteredProductsByCategory: null | ProductsFetchedData;
  fetchedProducts: ProductsFetchedData;
};

////PRODUCTIMAGE TYPES
export type ProductImagesProps = {
  images: string[];
};

////QUANTITYBUTTON TYPES
export type QuantityButtonProps = {
  onDecrement: () => void;
  onIncrement: () => void;
  quantity: number;
};

//// SEARCHENGIN TYPES
export type FilteredProduct = {
  id: number;
  title: string;
  category: string;
};

////SHOPINFOBAR TYPES
export type ShopInfoBarProps = {
  first: number;
  second: number;
  total: number;
};

////CATEGORIES TYPES
export const categoryArray = z.array(z.string());
export type Category = z.infer<typeof categoryArray>;

////USER TYPES
const coordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string(),
  postalCode: z.string(),
  coordinates: coordinatesSchema,
  country: z.string(),
});

export type UserAddress = z.infer<typeof addressSchema>;

const hairSchema = z.object({
  color: z.string(),
  type: z.string(),
});

const bankSchema = z.object({
  cardExpire: z.string(),
  cardNumber: z.string(),
  cardType: z.string(),
  currency: z.string(),
  iban: z.string(),
});

const companySchema = z.object({
  department: z.string(),
  name: z.string(),
  title: z.string(),
  address: addressSchema,
});

const cryptoSchema = z.object({
  coin: z.string(),
  wallet: z.string(),
  network: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string(),
  age: z.number(),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email(),
  phone: z.string(),
  username: z.string(),
  password: z.string(),
  birthDate: z.string(),
  image: z.string().optional(),
  bloodGroup: z.string(),
  height: z.number(),
  weight: z.number(),
  eyeColor: z.string(),
  hair: hairSchema,
  ip: z.string(),
  address: addressSchema,
  macAddress: z.string(),
  university: z.string(),
  bank: bankSchema,
  company: companySchema,
  ein: z.string(),
  ssn: z.string(),
  userAgent: z.string(),
  crypto: cryptoSchema,
  role: z.enum(["admin", "moderator", "user"]),
});

export type User = z.infer<typeof userSchema>;

export type UserInitialState = {
  username: null | string;
  orders: OrderData[];
};

////CART TYPES
export const cartItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  discountPercentage: z.number(),
  image: z.string().url(),
  price: z.number(),
  purchaseTotal: z.number(),
  quantity: z.number(),
  shippingTime: z.string(),
  stock: z.number(),
});

export type CartItemT = z.infer<typeof cartItemSchema>;

//// USEDISCOUNT TYPES
export type UseDiscountProps = {
  discountPercentage: number;
  price: number;
};

////USEPANELOPEN TYPES
export type UsePanelOpenProps = {
  refValue: React.RefObject<HTMLDivElement>;
};

////USEQUANTITY TYPES
export type UseQuantityProps = {
  stock: number;
};

////USEREDIRECTTOPRODUCT TYPES
export type SelectedProduct = {
  id: number;
  title: string;
  category: string;
};
