import { ReactElement } from "react";
import { routesConfig } from "./../../config/app-config";
import { Link } from "react-router-dom";

interface LandingPageProps {
  isAuthenticated?: boolean;
}

export default function LandingPage({ isAuthenticated = true }: LandingPageProps): ReactElement {
  const contentPage = (
    <>
      <section className={`py-16 ${!isAuthenticated && "bg-soft-beige"} text-center`}>
        <h2 className="text-4xl font-bold mb-12">Why Choose Cosmosound?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center">
            <img
              loading="eager"
              src="/img/icons/album.png"
              alt="Library"
              className="mm-size-14 mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Massive Library</h3>
            <p className="text-dark-grey">Access millions of albums from your favorite artists.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              loading="eager"
              src="/img/icons/playlist.png"
              alt="Playlist"
              className="mm-size-12 mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Custom Playlists</h3>
            <p className="text-dark-grey">Create and organize your own playlists.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              loading="eager"
              src="/img/icons/quality.png"
              alt="Quality"
              className="mm-size-14 mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Lossless Quality</h3>
            <p className="text-dark-grey">
              Listen to your favorite tracks in lossless audio quality.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-16 ${!isAuthenticated && "bg-secondary-orange"}`}>
        <h2 className="text-3xl font-light mb-12 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-white text-dark-custom p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">
              "I discover new bangers every day. A must-have for music lovers!"
            </p>
            <p className="font-bold flex flex-row gap-1 mt-auto">
              <img
                loading="eager"
                src="/img/avatar/Clara.jpg"
                alt=""
                className="mm-size-6 rounded-full"
              />
              - Clara B.
            </p>
          </div>
          <div className="bg-white text-dark-custom p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">"An intuitive interface and perfect recommendations."</p>
            <p className="font-bold flex flex-row gap-1 mt-auto">
              <img
                loading="eager"
                src="/img/avatar/Jean.jpg"
                alt=""
                className="mm-size-6 rounded-full"
              />
              - Jean M.
            </p>
          </div>
          <div className="bg-white text-dark-custom p-6 rounded-lg shadow-lg">
            <p className="mb-4 italic">
              "The Hi-Fi quality allows me to rediscover my favorite tracks."
            </p>
            <p className="font-bold flex flex-row gap-1 mt-auto">
              <img
                loading="eager"
                src="/img/avatar/Sophie.jpg"
                alt=""
                className="mm-size-6 rounded-full"
              />
              - Sophie R.
            </p>
          </div>
        </div>
      </section>

      <section className={`py-16 ${!isAuthenticated && "bg-soft-beige"} text-center`}>
        <h2 className="text-4xl font-light mb-6">About Me</h2>
        <p className="text-lg mb-4">
          I'm a 22-year-old developer from France, working on this self-project. My skills span both
          frontend and backend development.
        </p>
        <p className="text-lg mb-4">
          All files and data for this project are securely stored on a self-hosted Nextcloud
          solution, ensuring full control and privacy over the infrastructure.
        </p>
        <p className="text-lg mb-4">
          If you have any questions or feedback, feel free to reach out to me!
        </p>
        <p className="text-lg mb-4">
          <strong>Email:</strong> luhcaran.dev@gmail.com
        </p>
        <p className="text-lg mb-4">
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/enzo-chaboisseau/"
            className="text-primary-orange hover:underline">
            linkedin.com/in/enzo-chaboisseau/
          </a>
        </p>
        <p className="text-lg mb-4">
          <strong>Portfolio:</strong>{" "}
          <a href="https://enzo.chaboisseau.net/" className="text-primary-orange hover:underline">
            enzo.chaboisseau.net
          </a>
        </p>
      </section>
    </>
  );

  return isAuthenticated ? (
    contentPage
  ) : (
    <div className="bg-body-bg text-dark-custom font-bs">
      <img
        loading="eager"
        className="fixed mm-size-14 left-3 top-3"
        src="/img/cosmosound.png"
        alt="Cosmosound"
      />
      <section
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('/img/homepage.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="text-center px-4 max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Your music, everywhere, all the time.
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90 mb-8">
            Discover millions of tracks, create your custom playlists, and dive into a limitless
            musical universe.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to={routesConfig.register.path}
              className="bg-primary-orange hover:bg-tertio-orange text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg">
              Get Started for Free
            </Link>
            <Link
              to={routesConfig.login.path}
              className="bg-transparent border border-primary-orange text-primary-orange hover:bg-tertio-orange hover:text-dark-custom px-6 py-3 rounded-full font-medium text-lg shadow-lg">
              Log In
            </Link>
          </div>
        </div>
      </section>
      {contentPage}
      <footer className="py-12 bg-dark-custom text-white text-center">
        <p>© 2025 Cosmosound. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link to={routesConfig.legal.path} className="hover:underline">
            Terms of Use
          </Link>
          <Link to={routesConfig.legal.path} className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </div>
  );
}
