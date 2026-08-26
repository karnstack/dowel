const markdownType = "text/markdown; charset=utf-8";
const llmsLink = '</llms.txt>; rel="describedby"; type="text/markdown"';

function wantsMarkdown(request) {
  return request.headers
    .get("Accept")
    ?.toLowerCase()
    .split(",")
    .some((value) => value.trim().startsWith("text/markdown"));
}

function markdownPath(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "/index.md";
  if (path === "/components") return "/components/index.md";
  return path + ".md";
}

function withDiscoveryHeaders(response, markdown = false) {
  const headers = new Headers(response.headers);
  headers.set("Link", llmsLink);
  headers.append("Vary", "Accept");
  if (markdown) headers.set("Content-Type", markdownType);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && wantsMarkdown(request)) {
      const markdownUrl = new URL(markdownPath(url.pathname), url);
      const markdownResponse = await env.ASSETS.fetch(
        new Request(markdownUrl, request),
      );
      if (markdownResponse.ok) {
        return withDiscoveryHeaders(markdownResponse, true);
      }
    }

    return withDiscoveryHeaders(await env.ASSETS.fetch(request));
  },
};
