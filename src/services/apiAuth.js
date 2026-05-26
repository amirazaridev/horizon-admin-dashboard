import { API_URL } from "./apiConstants";

export async function login(user) {
  const res = await fetch(`${API_URL}/api/v1/users/login_admin`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);
  console.log(data);
  return data;
}
export async function getUser() {
  const res = await fetch(`${API_URL}/api/v1/users/login`, {
    credentials: "include",
  });
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    return null;
  }
  return data.user;
}
export async function logout() {
  const res = await fetch(`${API_URL}/api/v1/users/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    const { message } = res.json();
    throw new Error(message);
  }
  return true;
}
