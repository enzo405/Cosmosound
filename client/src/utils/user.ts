export const displayPictureProfile = (link: string | undefined): string => {
  if (!link) return "";

  if (link.startsWith("https://nc.chaboisseau.net/index.php/s/")) {
    return `${link}/preview`;
  } else {
    return link;
  }
};
