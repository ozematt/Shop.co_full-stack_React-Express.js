import { type User, userSchema } from "../../lib/types";
import { USERS } from "../constants";

const fetchUserData = async (id: number) => {
  try {
    const response = await fetch(`${USERS}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const user: unknown = await response.json();
    const validateUser = userSchema.safeParse(user);

    if (!validateUser.success) {
      console.error("Validation error:", validateUser.error);
      throw new Error("Validation failed: " + validateUser.error);
    }
    const validProducts: User = validateUser.data;
    return validProducts;
  } catch (error) {
    console.error("There has been a problem with fetch", error);
    throw error;
  }
};

export default fetchUserData;
