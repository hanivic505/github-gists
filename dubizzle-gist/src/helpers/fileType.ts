import slugify from "slugify";

export const getFileType = (mimeType: string) => {
  const type = slugify(mimeType);
  return type
    .replace("application", "")
    .replace("plain", "")
    .replace(/^x-/, "");
};
