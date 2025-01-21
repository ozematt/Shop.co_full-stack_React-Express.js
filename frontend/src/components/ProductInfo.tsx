import { useState } from "react";
import { Comment, Details, DetailsButton } from "./";
import { type Product } from "../lib/types";

const ProductInfo = ({
  brand,
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  reviews,
}: Product) => {
  //
  ////DATA
  //state to handle which details were about to show
  const [details, setDetails] = useState("Product");

  ////UI
  return (
    <section className="mt-[65px] w-full">
      <div className="">
        <DetailsButton
          onClick={() => setDetails("Product")}
          details={details}
          title={"Product"}
        >
          Product Details
        </DetailsButton>
        <DetailsButton
          onClick={() => setDetails("Reviews")}
          details={details}
          title={"Reviews"}
        >
          Rating & Reviews
        </DetailsButton>
      </div>

      <div className="my-8 font-satoshi">
        {details === "Product" ? (
          <Details
            brand={brand}
            weight={weight}
            dimensions={dimensions}
            warrantyInformation={warrantyInformation}
            shippingInformation={shippingInformation}
          />
        ) : (
          <div className="">
            <h4 className="font-satoshi text-xl font-bold md:text-2xl">
              All Reviews
            </h4>
            <div className="mt-[20px] flex gap-3 max-md:flex-wrap max-md:justify-center md:mt-[32px] md:gap-6">
              {reviews.map((comment, index) => (
                <Comment
                  key={index}
                  rating={comment.rating}
                  name={comment.reviewerName}
                  text={comment.comment}
                  date={comment.date}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductInfo;
