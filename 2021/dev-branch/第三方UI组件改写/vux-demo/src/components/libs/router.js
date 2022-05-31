export function go (url, $router) {
  // url不存在或url前缀是javas时return
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) { // url是对象，或url是字符串且不包含http且$router存在
    if (typeof url === 'object' && url.replace === true) { // replace
      $router.replace(url)
    } else { // push goBack
      url === 'BACK' ? $router.go(-1) : $router.push(url)
    }
  } else {
    window.location.href = url
  }
}

export function getUrl (url, $router) {
  // Make sure the href is right in hash mode
  if ($router && !$router._history && typeof url === 'string' && !/http/.test(url)) {
    return '#!' + url
  }
  return url && typeof url !== 'object' ? url : 'javascript:void(0);'
}
