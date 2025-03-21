const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    console.error("Registration Error:", error);
    return { error: "Registration failed!" };
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // Store token
    }
    return data;
  } catch (error) {
    console.error("Login Error:", error);
    return { error: "Login failed!" };
  }
};
