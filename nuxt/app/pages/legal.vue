<script setup lang="ts">
const LAST_UPDATED = '13 novembre 2026'

useSeoMeta({
  title: 'Mentions légales — Nell Vandaele',
  description:
    'Mentions légales du site de Nell Vandaele : édition, hébergement, propriété intellectuelle, liens externes et données personnelles.',
  robots: 'index, follow',
  ogTitle: 'Mentions légales — Nell Vandaele',
  ogDescription:
    'Édition, hébergement, propriété intellectuelle et informations légales du site nellvand.fr.',
})
</script>

<template>
  <LegalPage
    title="Mentions légales"
    description="Informations légales relatives au site nellvand.fr"
    :updated="LAST_UPDATED"
  >
    <h2 id="editeur">Éditeur∙rice du site</h2>
    <p>Le site <strong>nellvand.fr</strong> est édité par :</p>
    <ul>
      <li>
        <strong>Nell Vandaele</strong>, entrepreneur∙e individuel∙le (EI), exerçant sous le nom
        commercial « Nell Vandaele ».
      </li>
      <li>Adresse : 38 Rue du Maire Becquart, 59160 Lomme, France.</li>
      <li>SIREN : 933 603 615 (Registre national des entreprises).</li>
      <li>SIRET : 933 603 615 00016.</li>
      <li>TVA : TVA non applicable, article 293 B du Code général des impôts.</li>
      <li>Email : <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a>.</li>
      <li>Téléphone : <a href="tel:+33767870696">+33 7 67 87 06 96</a>.</li>
      <li>Directeur∙rice de la publication : Nell Vandaele.</li>
    </ul>
    <p>
      Activité : prestations de technique du spectacle, audiovisuel, design et web.
    </p>

    <h2 id="hebergeur">Hébergement</h2>
    <p>Le site est hébergé par :</p>
    <ul>
      <li><strong>netcup GmbH</strong></li>
      <li>Emmy-Noether-Straße 10, D-76131 Karlsruhe, Allemagne.</li>
      <li>Téléphone : <a href="tel:+4972175407550">+49 721 7540755-0</a>.</li>
      <li>Email : <a href="mailto:impressum@netcup.com">impressum@netcup.com</a>.</li>
      <li>
        Site :
        <a href="https://www.netcup.com" target="_blank" rel="noopener">
          www.netcup.com
        </a>.
      </li>
      <li>Immatriculation : HRB 705547, Amtsgericht Mannheim.</li>
      <li>TVA intracommunautaire : DE262851304.</li>
    </ul>
    <p>
      Les données du site sont hébergées en Allemagne. Les sauvegardes sont hébergées en France,
      chez Scaleway (Paris).
    </p>

    <h2 id="propriete-intellectuelle">Propriété intellectuelle</h2>
    <p>
      L’ensemble des contenus présents sur le site — textes, photographies, vidéos, animations,
      graphismes, logo, code source et éléments de design — est protégé par le droit d’auteur et
      reste la propriété de Nell Vandaele ou de leurs auteur∙rice∙s respectif∙ve∙s.
    </p>
    <p>
      Toute reproduction, représentation, modification, adaptation ou exploitation, totale ou
      partielle, sans autorisation écrite préalable est interdite.
    </p>
    <p>
      Les crédits des photographies, vidéos, créations graphiques et autres contenus tiers sont
      indiqués sur les pages projet lorsqu’ils sont disponibles. Les marques et logos de tiers
      appartiennent à leurs propriétaire∙s respectif∙ve∙s.
    </p>
    <p>
      Conception, design et développement : Nell Vandaele. Typographies : Porpora et Mattone.
    </p>
    <p>
      Les personnes identifiables apparaissant dans les photographies ou vidéos peuvent demander le
      retrait d’un contenu en écrivant à
      <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a>.
    </p>

    <h2 id="liens">Liens vers des sites tiers</h2>
    <p>
      Le site contient des liens vers des services tiers (Instagram, WhatsApp, YouTube, Vimeo,
      Figma, Behance, etc.). Ces liens sont fournis à titre informatif. Nell Vandaele n’exerce
      aucun contrôle sur ces services et décline toute responsabilité quant à leurs contenus, leurs
      pratiques ou leurs politiques de confidentialité.
    </p>
    <p>
      L’ouverture d’un lien tiers peut entraîner le dépôt de cookies ou le traitement de données
      par ce service. Nous vous invitons à consulter sa politique de confidentialité avant de
      l’utiliser.
    </p>

    <h2 id="responsabilite">Responsabilité</h2>
    <p>
      Les informations publiées sur le site sont fournies à titre indicatif. Nell Vandaele
      s’efforce de les maintenir à jour, mais ne garantit pas leur exhaustivité ni leur exactitude.
      Elle décline toute responsabilité quant aux dommages directs ou indirects résultant de
      l’utilisation du site ou de l’impossibilité d’y accéder.
    </p>
    <p>
      Le site peut être interrompu temporairement pour maintenance, mise à jour ou raison de
      sécurité.
    </p>

    <h2 id="donnees-personnelles">Données personnelles et cookies</h2>
    <p>
      Le site ne comporte ni formulaire de contact, ni newsletter, ni espace personnel, ni paiement
      en ligne. Les données transmises par email ou téléphone sont traitées conformément à la
      <NuxtLink to="/confidentiality">politique de confidentialité</NuxtLink>.
    </p>
    <p>
      À ce jour, le site n’utilise pas de cookies non essentiels. Pour en savoir plus, consultez la
      <NuxtLink to="/confidentiality">politique de confidentialité</NuxtLink>.
    </p>

    <h2 id="droit-applicable">Droit applicable</h2>
    <p>
      Les présentes mentions légales sont soumises au droit français. En cas de litige, et sous
      réserve des règles impératives applicables aux consommateur∙rice∙s, les tribunaux français
      seront compétents.
    </p>
  </LegalPage>
</template>
