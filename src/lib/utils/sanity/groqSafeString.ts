// Helper function to sanitize input and create a GROQ-safe string
export function groqSafeString(input: string): string {
  if (!input) return "";

  // Escape special characters
  let escapedString = input
    .replace(/\\/g, "\\\\") // Escape backslashes
    .replace(/"/g, '\\"'); // Escape double quotes

  // Limit to a set of allowed characters
  const allowedCharacters = /^[a-zA-Z0-9\s\-&]*$/; // Allow alphanumeric, spaces, hyphens, and ampersands
  if (!allowedCharacters.test(escapedString)) {
    // If the string contains disallowed characters, return an empty string or a safe default
    console.warn("Input contains disallowed characters:", input);
    return ""; // Or return a safe default, like "invalid"
  }

  return escapedString;
}
