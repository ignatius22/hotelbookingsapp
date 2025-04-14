import { fetchApi } from "./apiRequest";
import supabase, { supabaseUrl } from "./supabase";
import { saveSession, clearSession } from "../utils/tokenUtils";

export async function signup({ full_name, email, password }) {
  const payload = { user: { full_name, email, password } };

  const res = await fetchApi("/api/v1/signup", {
    method: "POST",
    body: payload,
  });

  console.log(res);
  return res;
}

export async function login({ email, password }) {
  try {
    const response = await fetchApi("/api/v1/login", {
      method: "POST",
      body: { user: { email, password } },
    });

    if (
      !response?.data?.user ||
      !response?.data?.token ||
      response.code !== 200
    ) {
      throw new Error(response?.message || "Invalid login response");
    }

    const { user, token } = response.data;

    // Save session using token utility
    saveSession(token, user);

    if (process.env.NODE_ENV === "development") {
      console.log("Logged user:", user);
    }

    return { user, token };
  } catch (error) {
    const errorMap = {
      "Invalid email or password":
        "Invalid email or password. Please try again.",
      401: "Invalid email or password. Please try again.",
      "Failed to fetch": "Network error. Please check your connection.",
      "Invalid login response":
        "Server returned an invalid response. Try again later.",
    };

    const errorMessage = error.message || "Login failed";
    const message = Object.keys(errorMap).find((key) =>
      errorMessage.includes(key)
    )
      ? errorMap[errorMessage]
      : "Unable to log in. Please try again later.";

    console.error("Login error:", errorMessage);
    throw new Error(message);
  }
}

export async function getCurrentUser() {
  const URL = "/api/v1/users/current";

  const response = await fetchApi(URL, {
    method: "GET",
  });
  return response.data;
}

export async function logout() {
  try {
    // Clear session using token utility
    clearSession();

    if (process.env.NODE_ENV === "development") {
      console.log("User logged out successfully.");
    }

    // Optionally, redirect the user to the login page or home page
    window.location.href = "/login"; // Adjust the path as needed
  } catch (error) {
    console.error("Error during logout:", error.message || error);
    throw new Error("Unable to log out. Please try again later.");
  }
}

export async function updateCurrentUser({ full_name, password, avatar }) {
  const URL = "/api/v1/users/update ";
  let updateData = {};
  if (password) updateData.password = password;
  if (full_name) updateData.data = { full_name };

  const res = await fetchApi(URL, {
    method: "PUT",
    body: updateData,
  });

  console.log(res);
  return res.data;
}
