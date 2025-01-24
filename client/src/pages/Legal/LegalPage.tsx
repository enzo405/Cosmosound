import Container from "components/box/Container";
import { ReactElement } from "react";

export default function LegalPage(): ReactElement {
  return (
    <Container className="p-6 bg-gray-50 text-gray-900 flex-col">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Informations générales</h2>
        <p>
          Cosmosound est une plateforme de streaming musical développée dans le cadre d'une
          formation en Licence CDA. Le but est de permettre aux utilisateurs de découvrir de
          nouveaux artistes, d'écouter de la musique, et de gérer leurs profils.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Collecte et gestion des données</h2>
        <h3 className="text-xl font-medium mt-4 mb-2">Pour les utilisateurs</h3>
        <p>Lors de la création de compte, nous collectons les informations suivantes :</p>
        <ul className="list-disc list-inside">
          <li>Nom d'utilisateur</li>
          <li>Email</li>
          <li>Photo de profil</li>
          <li>Préférences musicales</li>
        </ul>
        <p>
          Ces données sont utilisées pour gérer votre compte et améliorer votre expérience sur la
          plateforme. Vous pouvez modifier ou supprimer ces informations à tout moment via les
          paramètres de votre compte.
        </p>

        <h3 className="text-xl font-medium mt-4 mb-2">Pour les artistes</h3>
        <p>En tant qu'artiste, nous collectons également :</p>
        <ul className="list-disc list-inside">
          <li>Nom d'artiste</li>
          <li>Liens vers vos réseaux sociaux</li>
          <li>Genres musicaux proposés</li>
        </ul>
        <p>
          Ces informations sont utilisées pour présenter vos musiques sur la plateforme et améliorer
          votre visibilité auprès des utilisateurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Gestion des messages et des statistiques</h2>
        <p>
          Nous collectons des statistiques d'utilisation (temps d'écoute, genres préférés, artistes
          écoutés, historique) pour améliorer les recommandations et l'expérience utilisateur. Vous
          avez la possibilité de désactiver la réception des emails relatifs à ces statistiques via
          les paramètres de votre compte.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">4. Contact</h2>
        <p>
          Pour toute question ou demande concernant vos données personnelles, vous pouvez nous
          contacter via le formulaire dédié dans l'application.
        </p>
      </section>
    </Container>
  );
}
