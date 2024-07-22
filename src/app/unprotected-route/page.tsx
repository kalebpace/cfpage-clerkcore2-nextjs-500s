"use client";

import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <Link href={"/"} onClick={() => revalidatePath("/")}>
        Revalidate and navigate to /
      </Link>
      <Link
        href={"/protected-route"}
        onClick={() => revalidatePath("/protected-route")}
      >
        Revalidate and navigate to /protected-route
      </Link>
    </div>
  );
}
