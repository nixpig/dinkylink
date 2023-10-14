import crypto from "crypto";

export const generateUniqueShortCode = async () => {
  const uniqueShortCode = crypto.randomBytes(3).toString("hex").slice(0, 5);

  return uniqueShortCode;
};
