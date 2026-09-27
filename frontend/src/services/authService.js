const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Normalize endpoint prefix (supports both direct FastAPI and Express routes)
const cleanUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;

export async function signupUser({ name, email, password }) {
  const res = await fetch(`${cleanUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to create account.");
  }
  return data;
}

export async function signinUser({ email, password }) {
  const res = await fetch(`${cleanUrl}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Invalid credentials.");
  }
  return data;
}

export async function getCurrentUser(token) {
  const res = await fetch(`${cleanUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.message || "Failed to authenticate.");
  }
  return data.user || data.data?.user;
}

export async function signoutUser(token) {
  try {
    await fetch(`${cleanUrl}/auth/signout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.warn("Signout request failed silently:", err);
  }
}
