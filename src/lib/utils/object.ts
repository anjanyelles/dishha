export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export function objectKeys<K extends PropertyKey>(object: Record<K, unknown>): Array<K> {
  return Object.keys(object) as Array<K>;
}
