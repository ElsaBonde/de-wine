import { auth } from "@/auth";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    return <p>Not authenticated</p>;
  }

  return (
    <>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
      {session.user.image ? (
        <Image
          src={session?.user.image}
          alt="userbild"
          width={500}
          height={500}
        />
      ) : (
        <p>No image avalible</p>
      )}
    </>
  );
}
