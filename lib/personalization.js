export const MAX_NAME_LENGTH = 12;

export function validateName(value, required = false) {
  if (value.length > MAX_NAME_LENGTH) return "That name is too long — 12 characters max for embroidery.";
  if (value && !/^[\p{L}\p{M} '\u2019-]+$/u.test(value)) return "Use letters, spaces, hyphens, or apostrophes for the embroidered name.";
  if (required && !/\p{L}/u.test(value)) return "Add a name with at least one letter to preview your set.";
  return "";
}
