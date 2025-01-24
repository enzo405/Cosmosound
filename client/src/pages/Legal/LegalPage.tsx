import Container from "components/box/Container";
import { routesConfig } from "config/app-config";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface LegalPageProps {
  isAuthenticated?: boolean;
}

export default function LegalPage({ isAuthenticated = true }: LegalPageProps): ReactElement {
  const contentPage = (
    <Container className="p-6 bg-gray-50 text-gray-900 flex-col">
      <h1 className="text-3xl font-bold mb-4">Legal Notice</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. General Information</h2>
        <p>
          Cosmosound is a music streaming platform developed as part of a CDA License training
          program. The aim is to allow users to discover new artists, listen to music, and manage
          their profiles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Data Collection and Management</h2>
        <h3 className="text-xl font-medium mt-4 mb-2">For Users</h3>
        <p>When creating an account, we collect the following information:</p>
        <ul className="list-disc list-inside">
          <li>Username</li>
          <li>Email</li>
          <li>Profile Picture</li>
          <li>Musical Preferences</li>
        </ul>
        <p>
          This data is used to manage your account and enhance your experience on the platform. You
          can modify or delete this information at any time through your account settings.
        </p>

        <h3 className="text-xl font-medium mt-4 mb-2">For Artists</h3>
        <p>As an artist, we also collect:</p>
        <ul className="list-disc list-inside">
          <li>Artist Name</li>
          <li>Links to your social media</li>
          <li>Proposed Music Genres</li>
        </ul>
        <p>
          This information is used to showcase your music on the platform and improve your
          visibility to users.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Management of Messages and Statistics</h2>
        <p>
          We collect usage statistics (listening time, preferred genres, listened artists, history)
          to improve recommendations and user experience. You have the option to disable the receipt
          of emails related to these statistics via your account settings.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4. Contact</h2>
        <p>
          For any questions or requests regarding your personal data, you can contact us via the
          dedicated form in the application.
        </p>
      </section>

      <div className="mt-8 text-center">
        <Link to={routesConfig.home.path} className="p-8 text-primary-orange hover:underline">
          Return to Homepage
        </Link>
      </div>
    </Container>
  );

  return isAuthenticated ? (
    contentPage
  ) : (
    <div className="bg-body-bg text-dark-custom font-bs">
      {contentPage}
      <footer className="py-10 bg-dark-custom text-white text-center">
        <p>© 2025 Cosmosound. All rights reserved.</p>
      </footer>
    </div>
  );
}
