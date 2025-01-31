import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const CategoryName = () => {
  //
  ////DATA
  const categoryName = useSelector(
    (state: RootState) => state.products.categoryName,
  );

  ////UI
  return (
    <h3 className="font-satoshi text-2xl font-bold sm:text-[32px]">
      {categoryName ? categoryName : "Products"}
    </h3>
  );
};

export default CategoryName;
