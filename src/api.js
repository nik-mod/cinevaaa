const API_URL = "https://adi.duck.ge/api";

export async function request(path, method = "GET", body = null, token = "") {
  const response = await fetch(API_URL + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

export function getList(data) {
  return Array.isArray(data) ? data : data.data || [];
}
