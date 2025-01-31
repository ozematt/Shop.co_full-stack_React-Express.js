import { usePagedItems } from "../lib/hooks";

const NumberOfProducts = () => {
  //
  ////DATA
  const { total, firstIndex, secondIndex } = usePagedItems();

  //UI
  return (
    <p className="font-satoshi opacity-60 sm:pt-2">
      Showing {firstIndex}-{secondIndex} of {total} Products{" "}
      <span className="hidden pl-1 xl:inline">Sort by:</span>
    </p>
  );
};

export default NumberOfProducts;
