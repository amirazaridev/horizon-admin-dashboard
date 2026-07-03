import { getToday } from "../utils/helpers";
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
    credentials: "include",
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
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = res.json();
    console.error(message);
    throw new Error("The booking was not deleted.");
  }
  return true;
}
export async function getBookingAfterDate(date) {
  const res = await fetch(
    `${API_URL}/api/v1/bookings/recentdate?field=createdAt&today=${getToday({ end: true })}&date=${date}`,
  );
  const { data, message } = await res.json();

  if (!res.ok) {
    throw new Error(message);
  }

  return data.bookings;
}
export async function getStaysAfterDate(date) {
  const res = await fetch(
    `${API_URL}/api/v1/bookings/recentdate?field=startDate&today=${getToday({ end: true })}&date=${date}`,
  );
  const { data, message } = await res.json();

  if (!res.ok) {
    throw new Error(message);
  }

  return data.bookings;
}
export async function getStaysTodayActivity() {
  const res = await fetch(`${API_URL}/api/v1/bookings/todaydata`);
  const { data, message } = await res.json();

  if (!res.ok) throw new Error(message);

  return data.bookings;
}
