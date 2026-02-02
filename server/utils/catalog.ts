type CatalogType = "ALBUM" | "EP" | "SINGLE";

interface CatalogInput {
  numberOfTracks: number;
  totalDurationInMinutes: number;
}

export const guessCatalogType = ({
  numberOfTracks,
  totalDurationInMinutes,
}: CatalogInput): CatalogType => {
  if (numberOfTracks === 1 || totalDurationInMinutes <= 10) {
    return "SINGLE";
  } else if (numberOfTracks <= 5 && totalDurationInMinutes <= 30) {
    return "EP";
  } else {
    return "ALBUM";
  }
};
