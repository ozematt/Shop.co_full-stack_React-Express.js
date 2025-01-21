import { Rating, useMediaQuery } from "@mui/material";
import { useDiscount } from "../lib/hooks";
import { type Product } from "../lib/types";

const ProductMainDetails = ({
  discountPercentage,
  price,
  title,
  rating,
  description,
}: Product) => {
  //
  ////DATA
  const md = useMediaQuery("(min-width:768px)");
  //use custom hook to calculate the new price
  const { newPrice, discount } = useDiscount({ discountPercentage, price });

  ////UI
  return (
    <div>
      <h2 className="font-integralCFBold text-2xl leading-[28px] md:text-[40px] md:leading-[43px]">
        {title}
      </h2>
      <div className="flex pt-[14px]">
        <Rating
          name="rating"
          value={rating ? Math.round(rating * 2) / 2 : 5}
          precision={0.5}
          size={md ? "large" : "medium"}
          readOnly
        />{" "}
        <p className="pl-2 pt-[2px] font-satoshi max-md:text-sm md:pt-1">
          {Math.round(rating * 2) / 2}
          <span className="opacity-50">/5</span>
        </p>
      </div>
      {/* price */}
      <div className="flex items-center gap-[2px] pt-[14px] font-satoshi text-2xl font-bold md:text-[32px]">
        {" "}
        ${newPrice}
        {discount && (
          <>
            <span className="mx-[-9px] scale-[0.65] line-through opacity-30">
              ${price}
            </span>
            <div className="h-[28px] w-[58px] rounded-[62px] bg-red-500 bg-opacity-10 py-[6.5px] text-center font-satoshi text-xs font-medium text-red-500 dark:bg-opacity-90 dark:text-white">
              -{discount}%
            </div>
          </>
        )}
      </div>
      {/* captions */}
      <p className="pt-[20px] font-satoshi opacity-60 max-md:text-sm">
        {description}
      </p>
    </div>
  );
};

export default ProductMainDetails;
