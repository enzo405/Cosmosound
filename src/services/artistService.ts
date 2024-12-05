import dataArtist from "assets/json/artists.json";
import { Artist } from "models/User";

function getMyFavouriteArtist(): Artist[] {
  return dataArtist.filter((artist) =>
    [1, 2, 3, 14, 30, 34, 38, 51, 52, 59, 60, 66, 68, 71, 72, 73, 30, 29, 25, 24, 19, 16].includes(
      artist.id,
    ),
  );
}

const ArtistService = {
  getMyFavouriteArtist,
};

export default ArtistService;
