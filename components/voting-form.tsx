"use client";

import { vote } from "@/app/actions";
import { useActionState } from "react";
import { Button } from "./ui/button";

type Props = {
  imageId: string;
};

export default function VoteForm({ imageId }: Props) {
  const [state, formAction, isPending] = useActionState(vote, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="imageId" value={imageId} />

      <Button type="submit" variant="outline">
        {isPending ? "Voting..." : "Vote"}
      </Button>

      {state?.message && (
        <p
          className={`text-xs ${
            state.success ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
