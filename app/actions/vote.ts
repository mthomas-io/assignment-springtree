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

  // use IP address as user name for the purpose of this app
  const username = cookieStore.get("username")?.value;

  if (!username) {
    return {
      success: false,
      message: "You must set a username before you can vote!",
    };
  }

  const imageId = formData.get("imageId") as string;

  return {
    success: true,
    message: `User ${username} voted on ${imageId}`,
  };
}
