export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.hostname = "64bfb110-a64d-489b-919f-ca8186fa4353.cfargotunnel.com" // ← 改成你自己的 Tunnel 域名
  url.protocol = "https:"
  return fetch(url.toString(), context.request)
}
