import { ReactElement } from "react";
import { CreateCatalogFormData } from "../CreateCatalogPage";

interface CatalogCardProps {
  data: CreateCatalogFormData;
  preview: string;
}

export default function CatalogCard({ data, preview }: CatalogCardProps): ReactElement {
  return (
    <div className="flex gap-2 border rounded-lg p-4 shadow-md max-w-lg">
      <img
        src={preview}
        alt="Catalog Thumbnail"
        className="mm-size-16 md:mm-size-24 rounded-full border border-gray-300"
      />
      {data.musics.length > 0 ? (
        <div className="h-1/2 max-h-72 overflow-y-auto">
          <strong>Songs:</strong>
          <ul className="list-disc pl-5">
            {data.musics.map((music, index) => (
              <li key={index}>
                <strong>Title:</strong> {music.file.name}, <strong>Genres:</strong>{" "}
                {music.genres.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No songs added.</p>
      )}
    </div>
  );
}
