import { API_URL } from "./apiConstants";

export async function getUsers() {
  const res = await fetch(`${API_URL}/api/v1/users`, {
    credentials: "include",
  });
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);

  return data.users;
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
