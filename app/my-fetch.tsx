interface FetchOptions {
  key: string;
  revalidate?: number | false;
  path: "foo";
  method?: "GET" | "POST";
  input: any;
}

function getBaseUrl() {
  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    return `https://${vercel}`;
  }
  return "http://localhost:3000";
}

export async function myFetch<T = any>(opts: FetchOptions) {
  const { method = "GET" } = opts;

  let url = `${getBaseUrl()}/api/${opts.path}`;
  if (method === "GET") {
    url += `?input=${JSON.stringify(opts.input)}`;
  }

  const res = await fetch(url, {
    method,
    ...(method === "POST" && {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts.input),
    }),
    next: { tags: [opts.key], revalidate: opts.revalidate ?? false },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return (await res.json()) as T;
}
