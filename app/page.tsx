import { revalidateTag } from "next/cache";
import { myFetch } from "./my-fetch";

export default async function Home() {
  const data = await myFetch({
    key: "foobaz",
    path: "foo",
    input: { bar: "baz" },
    revalidate: 3,
  });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <form
        action={async () => {
          "use server";
          revalidateTag("foobaz");
        }}
      >
        <input type="submit" />
      </form>
    </div>
  );
}
