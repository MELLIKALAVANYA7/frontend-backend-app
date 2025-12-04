// Backend API URL - first try environment variable, else fallback to Render URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://frontend-backend-app.onrender.com/api";

// Main API request function
export async function apiRequest(path, method = "GET", body) {
  console.log("API URL:", API_URL);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${path}`, options);

  let data = {};
  try {
    data = await res.json();
  } catch (e) {
    console.error("Error parsing response JSON:", e);
  }

  return { ok: res.ok, data };
}

export default apiRequest;
