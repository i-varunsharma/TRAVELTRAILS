// Turns a state name into a URL-friendly slug, e.g. "Tamil Nadu" -> "tamil-nadu".
export function toSlug(name) {
  return name.toLowerCase().replace(/ /g, '-');
}

// Reverses toSlug so it can be matched back against a state name, e.g. "tamil-nadu" -> "tamil nadu".
export function fromSlug(slug) {
  return slug.replace(/-/g, ' ').toLowerCase();
}
