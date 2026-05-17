import { API_URL } from "./apiConstants";

const cabinAPI = `${API_URL}/api/v1/cabins`;

function imageCheck(cabin) {
  const hasImagePath = cabin.image?.startsWith?.(API_URL);

  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  return hasImagePath ? cabin.image : `${API_URL}/img/cabins/${imageName}`;
}

export async function getCabins() {
  const res = await fetch(cabinAPI);
  const { data, message } = await res.json();
  if (!res.ok) {
    console.error(message);
    throw new Error("مشکلی در دریافت اطلاعات پیش آمد");
  }

  return data?.cabins;
}
export async function deleteOfCabin(cabinId) {
  const res = await fetch(`${cabinAPI}/${cabinId}`, { method: "DELETE" });

  if (!res.ok) {
    const { message } = res.json();
    console.error(message);
    throw new Error("اتاق حذف نشد!");
  }
  return true;
}
export async function insertCabin(cabin, id) {
  const imagePath = imageCheck(cabin);

  const res = await fetch(cabinAPI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...cabin, image: imagePath }),
  });
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("اتاق ساخته نشد");
  }
  return data.cabin;
}
export async function updateCabin(cabin, id) {
  const imagePath = imageCheck(cabin);

  const res = await fetch(`${cabinAPI}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...cabin, image: imagePath }),
  });
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("عملیات ویرایش انجام نشد");
  }
  return data.cabin;
}
