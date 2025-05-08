export const fallbackLng = "en";
export const languages = [fallbackLng, "nl"];
export const flags = {
  [fallbackLng]: "US",
  nl: "NL",
};
export const defaultNS = "translation";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
