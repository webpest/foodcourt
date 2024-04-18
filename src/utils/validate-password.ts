import { Setting } from "../store/app-store";

export const validatePassword = (settings: Setting | null) => {
  if (settings === null) return () => null;
  const regexParts = [];

  if (settings.uppercase) regexParts.push("(?=.*[A-Z])");
  if (settings.lowercase) regexParts.push("(?=.*[a-z])");
  if (settings.figures) regexParts.push("(?=.*\\d)");
  if (settings.special) regexParts.push("(?=.*[@_$!%*#?&])");
  if (settings.length) regexParts.push(`.{8,}`);

  return regexParts.join("");
};
