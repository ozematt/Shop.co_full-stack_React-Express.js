import { OrdersT } from "../../lib/types";
import { AUTH_BASE } from "../constants";

const getOrder = async (): Promise<OrdersT[]> => {
  const token = localStorage.getItem("token");

  try {
    if (!token) throw new Error("User is not logged in");

    const response = await fetch(AUTH_BASE + "/orders", {
      headers: { Authorization: token },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response not ok");
    }

    const result = await response.json();

    return result;
  } catch (error: any) {
    console.error(
      "There has been a problem with fetching orders:",
      error.message,
    );
    throw error;
  }
};

export default getOrder;
