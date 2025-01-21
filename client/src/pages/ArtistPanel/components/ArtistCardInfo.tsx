import Container from "components/box/Container";
import Divider from "components/Divider";
import { Icon } from "components/icons/Icon";
import MediaIcon from "components/icons/media/MediaIcon";
import { routesConfig } from "config/app-config";
import { PartialArtist } from "models/User";
import React from "react";
import { useNavigate } from "react-router-dom";
import { displayPictureProfile } from "utils/user";

interface ArtistInfoCardProps {
  artist: PartialArtist;
}

const ArtistInfoCard: React.FC<ArtistInfoCardProps> = ({ artist }) => {
  const navigate = useNavigate();
  const {
    id,
    pictureProfile,
    name,
    artistName,
    followers,
    isVerified,
    genre,
    socialMedia,
    catalogs,
  } = artist;

  return (
    <Container className="w-full md:max-w-[50%] flex flex-col items-start p-4 lg:pt-6">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex items-center w-full max-w-full space-x-4">
          <img
            src={displayPictureProfile(pictureProfile)}
            alt={`${name}'s profile`}
            className="block mm-size-16 rounded-full object-cover"
          />
          <div className="w-full flex-1 min-w-8">
            <span className="block w-full text-xl font-bold text-nowrap truncate">
              <a
                className="hover:underline text-dark-custom hover:text-primary-orange cursor-pointer"
                onClick={() => navigate(routesConfig.artist.getParameter(id.toString()))}>
                {artistName || name}
              </a>{" "}
              {isVerified && (
                <span
                  className="text-blue-500 font-semibold ml-1 inline-flex items-center"
                  title="Verified Artist">
                  <Icon iconName="verified-label" className="mm-size-4" />
                </span>
              )}
            </span>
            <p className="text-gray-600 text-sm truncate">{genre || "Unknown Genre"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-gray-700">
        <span className="font-black">{followers.toLocaleString()}</span> Followers
      </div>

      {socialMedia && socialMedia.length > 0 && (
        <>
          <Divider />
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">Media Links:</h3>
            <span className="flex flex-wrap gap-2 items-center">
              {socialMedia.map(({ link, media }) => (
                <a
                  key={media}
                  href={link}
                  target="_blank"
                  className="flex items-center text-blue-500 hover:underline">
                  {<MediaIcon media={media} />}
                </a>
              ))}
            </span>
          </div>
        </>
      )}
      {catalogs && catalogs.length > 0 && (
        <>
          <Divider />
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold">Catalogs:</h3>
            <ul>
              {catalogs.map((catalog) => (
                <li key={catalog.id} className="mb-2 flex items-center">
                  <a href={`/catalog/${catalog.id}`}>
                    <a className="flex items-center">
                      <img
                        src={displayPictureProfile(catalog.thumbnail)}
                        alt={catalog.title}
                        className="mm-size-8 object-cover rounded mr-2"
                      />
                      <span className="text-blue-500 hover:underline">{catalog.title}</span>
                    </a>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Container>
  );
};

export default ArtistInfoCard;
