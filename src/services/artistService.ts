import dataArtist from "assets/json/artists.json";
import { Artist } from "models/User";

function getMyFavouriteArtist(): Artist[] {
  return dataArtist.filter((artist) => [1, 2, 3].includes(artist.id));
}

const ArtistService = {
  getMyFavouriteArtist,
};

export default ArtistService;
