import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  AlsoLike,
  Breadcrumbs,
  ProductInfo,
  ProductMainDetails,
  ProductImages,
  ProductMainButtons,
} from "./";
import { Footer, Newsletter } from "../sections";
import { defaultProduct } from "../constants";
import { type Product } from "../lib/types";

const ProductDetails = () => {
  //
  //DATA
  //data form local storage
  const localProduct = localStorage.getItem("product");
  const initialProduct = localProduct
    ? JSON.parse(localProduct)
    : defaultProduct;

  //displayed product state, initial state is product from local storage
  const [displayedProduct, setDisplayedProduct] =
    useState<Product>(initialProduct);

  //extracted id from ulr
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get("id")) || 1;

  //found product from all products
  const productFind = useSelector((state: RootState) =>
    state.products.fetchedProducts.products.find(
      (item) => item.id === Number(productId),
    ),
  );

  ////LOGIC

  useEffect(() => {
    const scrollToTop = () => window.scrollTo({ top: 0 });
    scrollToTop();
  }, []);

  useEffect(() => {
    if (productFind) {
      setDisplayedProduct(productFind); // added to local state
      localStorage.setItem("product", JSON.stringify(productFind)); //added to local storage
    }
  }, [productFind]);

  ////UI
  return (
    <>
      <section className="max-container px-4 sm:px-[100px]">
        <div className="border-b-2" />
        <Breadcrumbs />
        <div className="mt-9 lg:flex">
          <ProductImages images={displayedProduct.images} />
          <div className="mx-auto flex w-full max-w-[627px] flex-col justify-between max-lg:mt-7 lg:ml-[40px]">
            <ProductMainDetails {...displayedProduct} />
            <ProductMainButtons {...displayedProduct} />
          </div>
        </div>
        {/* Product details + reviews */}
        <ProductInfo {...displayedProduct} />
        <AlsoLike />
      </section>

      <div className="max-container">
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
