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
        href={"/unprotected-route"}
        onClick={() => revalidatePath("/unprotected-route")}
      >
        Revalidate and navigate to /unprotected-route
      </Link>
    </div>
  );
}
