import { CATEGORIES_LIST } from "../constants";
import { type Category, categoryArray } from "../../lib/types";

const fetchCategoriesList = async () => {
  try {
    const response = await fetch(CATEGORIES_LIST);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const categories = await response.json();
    const validateCategories = categoryArray.safeParse(categories);

    if (!validateCategories.success) {
      throw new Error("Validation failed: " + validateCategories.error);
    }

    const validData: Category = validateCategories.data;
    // console.log(validData);
    return validData;
  } catch (error) {
    console.error("There has been a problem with fetch", error);
    throw error;
  }
};

export default fetchCategoriesList;
