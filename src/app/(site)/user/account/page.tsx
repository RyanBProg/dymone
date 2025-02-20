import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }

  console.log(user);

  return (
    <main className="my-20 px-2">
      <h1 className="tracking-tighter font-extrabold text-[4rem] mb-5">
        My Account
      </h1>
      <p>Welcome {user.fullName}</p>
    </main>
  );
}
