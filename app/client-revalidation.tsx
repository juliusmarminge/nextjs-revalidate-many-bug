"use client";

export function ClientRevalidation() {
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          url.searchParams.set("tags", "foo");
          url.pathname = "/api/revalidate";
          await fetch(url.toString(), { method: "POST" });
        }}
      >
        <button type="submit">Revalidate `foo` w/ Client Component</button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          url.searchParams.set("tags", "bar");
          url.pathname = "/api/revalidate";
          await fetch(url.toString(), { method: "POST" });
        }}
      >
        <button type="submit">Revalidate `bar` w/ Client Component</button>
      </form>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const url = new URL(window.location.href);
          url.searchParams.set("tags", "bar,foo");
          url.pathname = "/api/revalidate";
          await fetch(url.toString(), { method: "POST" });
        }}
      >
        <button type="submit">Revalidate both w/ Client Component</button>
      </form>
    </>
  );
}
