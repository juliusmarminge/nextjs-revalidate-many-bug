import { revalidateTag } from "next/cache";
import { fetchBar, fetchFoo, myFetch } from "./my-fetch";
import { ClientRevalidation } from "./client-revalidation";

export default async function Home() {
  const foo = await fetchFoo();
  const bar = await fetchBar();

  return (
    <div>
      <pre>{JSON.stringify({ foo, bar }, null, 4)}</pre>
      <ServerRevalidation />
      <ClientRevalidation />
    </div>
  );
}

function ServerRevalidation() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          revalidateTag("foo");
        }}
      >
        <button type="submit">Revalidate `foo` w/ Server Action</button>
      </form>
      <form
        action={async () => {
          "use server";
          revalidateTag("bar");
        }}
      >
        <button type="submit">Revalidate `bar` w/ Server Action</button>
      </form>
      <form
        action={async () => {
          "use server";
          revalidateTag("bar");
          revalidateTag("foo");
        }}
      >
        <button type="submit">Revalidate `both` w/ Server Action</button>
      </form>
    </>
  );
}
