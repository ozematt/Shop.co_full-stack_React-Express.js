import { AUTH_BASE } from "../constants";

const authenticate = async (
  auth: string,
  username: string,
  password: string,
) => {
  try {
    const response = await fetch(
      AUTH_BASE + (auth === "register" ? "/register" : "/login"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    if (!response) {
      throw new Error("Network response not ok");
    }

    const result = await response.json();
    console.log(result);
    if (result.token) {
      localStorage.setItem("token", result.token);
    } else {
      throw Error("❌ Failed to authenticate...");
    }
    return result.token;
  } catch (error: any) {
    console.error("There has been a problem with fetch:", error);
    throw error;
  }
};

export default authenticate;
