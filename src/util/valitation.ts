export function isObject<T>(value: unknown): value is Record<string, unknown> & Partial<T> {
  return (
    value !== null
    && typeof value === 'object'
  )
}

export function isMediaStream(value: unknown): value is MediaStream {
  return (
    isObject<MediaStream>(value)
    && typeof value.getVideoTracks === 'function'
  )
}