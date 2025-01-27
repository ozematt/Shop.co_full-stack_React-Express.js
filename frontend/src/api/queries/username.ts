import { AUTH_BASE } from "../constants";

const getUser = async () => {
  const token = localStorage.getItem("token") || null;

  try {
    if (!token) {
      throw new Error("No user logged in");
    }

    const response = await fetch(`${AUTH_BASE}/user`, {
      headers: { Authorization: token },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const user = await response.json();

    return user;
  } catch (error) {
    console.error("There has been a problem with fetch", error);
    throw error;
  }
};

export default getUser;
