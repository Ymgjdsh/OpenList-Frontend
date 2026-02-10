export async function onRequest(context) {
  const url = new URL(context.request.url)
  url.hostname = "dpan.ymg.qzz.io"
  url.port = "5488"
  url.protocol = "https:"
  return fetch(url.toString(), context.request)
}
