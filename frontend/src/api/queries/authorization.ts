import { AUTH_BASE } from "../constants";

type Authenticate = {
  auth: string;
  username: string;
  password: string;
};

const authenticate = async ({ auth, username, password }: Authenticate) => {
  try {
    const response = await fetch(
      AUTH_BASE + (auth === "register" ? "/register" : "/login"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
    );

    if (!response.ok) {
      // If the response is not OK, we throw an exception
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response not ok");
    }

    const result = await response.json();

    if (result.token) {
      localStorage.setItem("token", result.token);
      return result;
    } else {
      throw Error("Authentication failed: token not provided by the server.");
    }
  } catch (error: any) {
    console.error("There has been a problem with fetch:", error.message);
    throw error;
  }
};

export default authenticate;
