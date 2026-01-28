export function removeTrailingSlash(str: string) {
  return str.length > 1 ? str.replace(/\/+$/gim, '') : str;
}

export function removeMultipleSlashes(str: string) {
  return str.replace(/\/{2,}/gim, '/') || '/';
}

export function sanitizeSlug(slug: string, { stripLanguage } = { stripLanguage: false }) {
  // our stories are located in a root "pages" folder that shouldn't be considered in paths
  const path = (slug || '/').replace(/^(.[^/]+\/)?\/?(pages\/)/g, stripLanguage ? '/' : '$1/');

  return removeMultipleSlashes(removeTrailingSlash(`/${path}`));
}
