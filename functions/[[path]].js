export async function onRequest(context) {
  const url = new URL(context.request.url)

  // 只处理API请求
  if (url.pathname.startsWith("/api/")) {
    // 替换为专用API域名
    url.hostname = "api-alist.ymg.qzz.io"
    url.protocol = "https:"
    url.port = ""

    // 尝试从缓存中获取
    const cache = caches.default
    let response = await cache.match(url.toString())

    if (!response) {
      // 缓存中没有，则从源站获取
      response = await fetch(url.toString(), context.request)

      // 克隆响应以便缓存
      response = new Response(response.body, response)

      // 设置缓存时间，例如60秒
      response.headers.set("Cache-Control", "public, max-age=60")

      // 存储到缓存
      context.waitUntil(cache.put(url.toString(), response.clone()))
    }

    // 添加CORS头
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://pan.ymg.qzz.io",
    )
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    )
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    )

    return response
  }

  // 非API请求，返回前端页面
  return context.next()
}
