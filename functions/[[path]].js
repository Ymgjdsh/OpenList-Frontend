export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.hostname = "64bfb110-a64d-489b-919f-ca8186fa4353.cfargotunnel.com"
  url.protocol = "https:"
  return fetch(url.toString(), context.request)
}
