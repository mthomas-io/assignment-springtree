"use server";

import { cookies } from "next/headers";

type FormState = {
  success: boolean;
  message: string;
};

export async function action(
  prevState: FormState | undefined,
  formData: FormData
) {
  const cookieStore = await cookies();
  const username = formData.get("username") as string;

  if (username.length < 3) {
    return {
      success: false,
      message: "Username must be at least 3 characters long",
    };
  }

  cookieStore.set("username", username);

  return {
    success: true,
    message: `Username set to ${username}, you now have the right to vote on our cat overlords.`,
  };
}
