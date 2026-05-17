import { API_URL } from "./apiConstants";

export async function getBookings(query = "") {
  let queryStr = "";
  if (query) queryStr = `?${new URLSearchParams(query).toString()}`;

  const res = await fetch(`${API_URL}/api/v1/bookings${queryStr}`);
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("Something went very wrong!");
  }

  const { bookings, count } = data;
  return { bookings, count };
}
export async function getBooking(id) {
  const res = await fetch(`${API_URL}/api/v1/bookings/${id}`);
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("Something went very wrong!");
  }

  return data.booking;
}
export async function updateBooking(id, booking) {
  const res = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  const { data, message } = await res.json();

  if (!res.ok) {
    console.error(message);
    throw new Error("Something went very wrong!");
  }

  return data.booking;
}
export async function deleteBooking(id) {
  const res = await fetch(`${API_URL}/api/v1/bookings/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const { message } = res.json();
    console.error(message);
    throw new Error("The booking was not deleted.");
  }
  return true;
}
