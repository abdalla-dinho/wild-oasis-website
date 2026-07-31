"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { deleteBooking, getBookings, updateBooking } from "./data-service";

export async function updateGuest(formData) {
  const session = await auth();

  if (!session)
    throw new Error("u need to be logged in to perform this action");

  const nationalID = formData.get("nationalID");
  const x = formData.get("nationality");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide valid national ID");

  const updateDate = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateDate)
    .eq("id", session.guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();

  if (!session)
    throw new Error("u need to be logged in to perform this action");

  // const guestBookings = await getBookings(session.guestId);
  // const guestBookingsIds = guestBookings.map((booking) => booking.id);

  // if (!guestBookingsIds.includes(bookingId))
  //   throw new Error("u are not allowed to perform this action !");

  await deleteBooking(bookingId, session.guestId);

  revalidatePath("/account/reservation");
}

export async function updateReservion(formData, bookingId) {
  const session = await auth();
  console.log(formData);
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");

  if (!session) throw new Error("plz login to perform this action");

  const guestId = session.guestId;

  const updateData = {
    numGuests,
    observations,
  };

  await updateBooking(bookingId, guestId, updateData);

  revalidatePath("/account/reservations/edit");
}

export async function createReservation(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("plz login to perform this action");

  const newBooking = {
    ...bookingData,
    guestId: session.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error_booked } = await supabase
    .from("Bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .lt("startDate", bookingData.endDate)
    .lt("endDate", bookingData.startDate);

  if (data.length > 0) throw new Error("the cabin is already booked");

  const { error } = await supabase
    .from("Bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error || error_booked) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabindId}`);
}

export async function sigInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
