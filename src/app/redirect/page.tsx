import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function Page() {
  return (<div className="flex flex-col gap-8">
    <div>{"This route should cause middleware to redirect you back to /"}</div>
    <Link href={"/"} onClick={() => revalidatePath("/")}>
      Revalidate and navigate to /
    </Link>
  </div>)
}
