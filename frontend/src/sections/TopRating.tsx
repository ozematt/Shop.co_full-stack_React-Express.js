import { useQuery } from "@tanstack/react-query";
import {
  type Product as ProductT,
  type ProductsFetchedData,
} from "../api/queries/products";
import { fetchProducts } from "../api/queries";
import { useEffect, useState } from "react";
import { Product } from "../components";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { addProducts } from "../redux/productsSlice";
import { useSelector } from "react-redux";

const TopRating = () => {
  //
  ////DATA
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  //products to show in this component, array with 4 elements
  const [productsToShow, setProductsToShow] = useState<ProductT[]>([]);

  //products in global state
  const allItems = useSelector(
    (state: RootState) => state.products.fetchedProducts.products,
  );

  // fetched products first time
  const { data: products } = useQuery<ProductsFetchedData>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  ////LOGIC
  useEffect(() => {
    //if products are already in global state - return
    if (allItems.length > 1) {
      //make four elements array
      const productSlice =
        products?.products
          .filter((product) => product.rating >= 4.9)
          .slice(0, 4) || [];
      setProductsToShow(productSlice);
      return;
    }
    //if products are ready fetched, add them to global state
    if (products) {
      dispatch(addProducts(products));
    }
  }, [dispatch, products, allItems]);

  ////UI
  return (
    <section
      id="topRating"
      className="mt-[50px] flex w-full max-w-[1400px] flex-col items-center px-4 sm:mt-[72px] sm:px-[100px]"
    >
      <h2 className="text-center font-integralCFBold text-[32px] sm:text-5xl">
        Top Rating
      </h2>

      <div className="scrollbar-hide flex h-[420px] w-full snap-x snap-mandatory gap-4 scroll-smooth max-xl:overflow-x-auto max-sm:mt-[-32px] sm:mt-[55px] sm:gap-5">
        {" "}
        {productsToShow?.map((product) => (
          <div
            key={product.id}
            className="scrollbar-hide flex-shrink-0 scale-75 snap-start overflow-hidden max-sm:mx-[-35px] sm:scale-100"
          >
            <Product {...product} />
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/shop"), window.scrollTo(0, 0);
        }}
        className="action:scale-100 mt-[-30px] cursor-pointer rounded-full border px-[80px] py-[15px] hover:scale-95 max-sm:w-full sm:mt-[36px]"
      >
        View All
      </button>
    </section>
  );
};

export default TopRating;
