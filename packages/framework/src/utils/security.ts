/**
 * Basic XSS Sanitizer
 * Removes <script>, <iframe>, <object>, <embed>, and event handlers (on*)
 * This is a lightweight alternative to DOMPurify for basic protection.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  // 1. Remove script tags and their content
  let clean = html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, "")
  
  // 2. Remove other dangerous tags
  clean = clean.replace(/<iframe\b[^>]*>([\s\S]*?)<\/iframe>/gim, "")
  clean = clean.replace(/<object\b[^>]*>([\s\S]*?)<\/object>/gim, "")
  clean = clean.replace(/<embed\b[^>]*>([\s\S]*?)<\/embed>/gim, "")
  
  // 3. Remove event handlers (e.g., onclick="...")
  clean = clean.replace(/ on\w+="[^"]*"/gim, "")
  clean = clean.replace(/ on\w+='[^']*'/gim, "")
  clean = clean.replace(/ on\w+=[^ >]*/gim, "")
  
  // 4. Remove javascript: protocol in href/src
  clean = clean.replace(/href=["']javascript:[^"']*["']/gim, 'href="#"')
  clean = clean.replace(/src=["']javascript:[^"']*["']/gim, 'src=""')

  return clean
}

/**
 * Escapes HTML special characters to prevent injection in plain text
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m] || m)
}
