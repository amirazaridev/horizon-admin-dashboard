import { API_URL } from "./apiConstants";

export async function getSettings() {
  const res = await fetch(`${API_URL}/api/v1/settings`);
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("Something went very wrong!");
  }
  return data.settings;
}

export async function updateSetting(newSetting) {
  const res = await fetch(`${API_URL}/api/v1/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSetting),
    credentials: "include",
  });
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("Something went very wrong!");
  }
  return data;
}
