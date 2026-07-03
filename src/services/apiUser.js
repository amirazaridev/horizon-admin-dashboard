import { API_URL } from "./apiConstants";

export async function getUsers(query = "") {
  let queryStr = "";
  if (query) queryStr = `?${new URLSearchParams(query).toString()}`;

  const res = await fetch(`${API_URL}/api/v1/users${queryStr}`, {
    credentials: "include",
  });
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);

  const { users, count } = data;
  return { users, count };
}
export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/api/v1/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }
  return true;
}
export async function insertUser(user) {
  const res = await fetch(`${API_URL}/api/v1/users`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);

  return data.user;
}
export async function updateUser(user) {
  const res = await fetch(`${API_URL}/api/v1/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);

  return data.user;
}
