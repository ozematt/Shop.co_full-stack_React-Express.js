import CircularProgress from "@mui/material/CircularProgress";
import { Footer, Newsletter } from "../sections";
import { usePagedItems, useTimeOut } from "../lib/hooks";
import {
  Breadcrumbs,
  Filters,
  PaginationBar,
  ShopInfoBar,
  ProductsList,
} from "./";

const Shop = () => {
  //
  ////DATA
  const { page, total, firstIndex, secondIndex } = usePagedItems();
  const { isReadyToShow } = useTimeOut(1000);

  ////UI
  return (
    <>
      <section className="max-container min-h-[1300px] px-4 sm:px-[100px]">
        <div className="border-b-2" />
        <Breadcrumbs />
        <div className="mt-[12px] flex sm:mt-[20px]">
          <div className="hidden w-full max-w-[295px] xl:block">
            <Filters />
          </div>
          <div className="w-full xl:ml-[20px]">
            <ShopInfoBar
              total={total}
              first={firstIndex}
              second={secondIndex}
            />
            <div className="mt-4 grid grid-cols-1 flex-wrap justify-center gap-5 sm:flex">
              {!isReadyToShow ? (
                <CircularProgress color="inherit" className="m-auto" />
              ) : (
                <ProductsList />
              )}
            </div>
            <div className="mt-[32px] border-b-2" />
            <PaginationBar total={total} page={page} />
          </div>
        </div>
      </section>

      <div className="max-container">
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Shop;
