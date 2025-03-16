"use client";

import { setUser } from "@/app/actions";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function UserForm() {
  const [state, formAction, isPending] = useActionState(setUser, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <p className="text-xs text-muted-foreground">
          Must be at least 3 characters
        </p>
        <Input id="username" name="username" placeholder="Username" />
      </div>

      <Button type="submit">
        {isPending ? "Changing idenitity..." : "Set username"}
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
