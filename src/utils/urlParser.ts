export const parseOrganizationUrl = (url: string): string | null => {
/*
  const parts = url.split('/')
  if (parts.length < 3) return null
  return parts[2].split('-')[0] // Извлекаем INN до первого тире
*/
const match = url.match(/^(\d+)-[a-z0-9-]+$/)
return match ? match[1] : null
}
