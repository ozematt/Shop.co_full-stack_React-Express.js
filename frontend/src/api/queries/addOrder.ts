import { OrderData } from "../../lib/types";
import { AUTH_BASE } from "../constants";

const addOrder = async (order: OrderData) => {
  const token = localStorage.getItem("token");

  try {
    if (!token) throw new Error("User is not logged in");

    const response = await fetch(AUTH_BASE + "/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response not ok");
    }

    const result = await response.json();

    console.log(result);
  } catch (error: any) {
    console.error("There has been a problem with order added:", error.message);
    throw error;
  }
};

export default addOrder;
