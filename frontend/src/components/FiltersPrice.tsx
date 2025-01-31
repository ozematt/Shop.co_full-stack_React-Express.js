import { useEffect, useState } from "react";
import { FilterHeader } from ".";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../redux/store";
import { Product } from "../lib/types";
import { addCategorizedProducts } from "../redux/productsSlice";

type FiltersPriceProps = {
  toggle: boolean;
  close?: () => void;
};

const FiltersPrice = ({ toggle, close }: FiltersPriceProps) => {
  //
  ////DATA
  const dispatch: AppDispatch = useAppDispatch();

  const [open, setOpen] = useState(true); //price filter open/close
  const [priceRange, setPriceRange] = useState({
    from: "",
    to: "",
  });

  const { fetchedProducts: allProducts, filteredProductsByCategory } =
    useSelector((state: RootState) => state.products);

  //toggle open state if filter icon was clicked
  useEffect(() => {
    if (toggle) return setOpen(true);
    setOpen(false);
  }, [toggle]);

  const filterByPriceRange = (products: Product[], from: number, to: number) =>
    products.filter((product) => product.price >= from && product.price <= to);

  const handleApplyFilter = () => {
    const actualProducts = filteredProductsByCategory || allProducts;

    const from = Number(priceRange.from) || 0;
    const to = Number(priceRange.to) || Infinity;

    if (from > to) {
      console.error("Invalid price range: 'from' cannot be greater than 'to'.");
      return;
    }

    //used helper function
    const priceRangedProducts = filterByPriceRange(
      actualProducts.products,
      from,
      to,
    );

    //creating relevant data to add
    const dataToAdd = {
      products: priceRangedProducts,
      total: priceRangedProducts.length,
      skip: 0,
      limit: 0,
    };

    close?.();

    dispatch(addCategorizedProducts(dataToAdd));
  };

  return (
    <>
      <FilterHeader title="Price" onClick={() => setOpen(!open)} state={open} />
      {open && (
        <div className="mt-4 flex gap-2">
          <input
            value={priceRange.from}
            name="from"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="from:"
          />
          <input
            value={priceRange.to}
            name="to"
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
            type="text"
            className="h-7 w-full max-w-[120px] rounded-sm pl-2 ring-1 ring-black ring-opacity-20 placeholder:text-sm focus:outline-none focus:ring-black dark:bg-zinc-700"
            placeholder="to:"
          />
        </div>
      )}
      <hr className="mt-6 pb-6" />
      <button
        onClick={handleApplyFilter}
        className="w-full rounded-full bg-black px-[86px] py-[15px] text-[14px] text-white transition duration-100 ease-in-out hover:scale-95 dark:bg-white dark:text-black"
      >
        Apply Filter
      </button>
    </>
  );
};

export default FiltersPrice;
