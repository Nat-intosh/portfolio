<script setup lang="ts">
const LAST_UPDATED = '13 novembre 2026'

useSeoMeta({
  title: 'Politique de confidentialité — Nell Vandaele',
  description:
    'Politique de confidentialité du site de Nell Vandaele : données collectées, finalités, bases légales, destinataire∙s, transferts, conservation, sécurité et droits RGPD.',
  robots: 'index, follow',
  ogTitle: 'Politique de confidentialité — Nell Vandaele',
  ogDescription:
    'Comment les données personnelles sont traitées sur le site nellvand.fr, conformément au RGPD.',
})
</script>

<template>
  <LegalPage
    title="Politique de confidentialité"
    description="Comment les données personnelles des visiteur∙euse∙s du site nellvand.fr sont traitées, conformément au RGPD et à la loi Informatique et Libertés."
    :updated="LAST_UPDATED"
  >
    <h2 id="responsable">Responsable du traitement</h2>
    <p>La personne responsable du traitement des données personnelles est :</p>
    <ul>
      <li><strong>Nell Vandaele</strong>, entrepreneur∙e individuel∙le (EI).</li>
      <li>Adresse : 38 Rue du Maire Becquart, 59160 Lomme, France.</li>
      <li>Email : <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a>.</li>
    </ul>
    <p>
      Aucun∙e délégué∙e à la protection des données (DPO) n’a été désigné∙e. Les demandes relatives
      aux données personnelles peuvent être adressées à l’adresse email ci-dessus ou par courrier à
      l’adresse de la personne responsable du traitement.
    </p>

    <h2 id="donnees">Données collectées et finalités</h2>
    <p>
      Le site ne comporte pas de formulaire de contact, de newsletter, d’espace personnel, de
      commentaires, ni de paiement en ligne. Aucune donnée n’est collectée automatiquement à des
      fins publicitaires ou de profilage.
    </p>
    <p>Les traitements suivants peuvent toutefois être mis en œuvre :</p>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-[760px]">
        <thead>
          <tr>
            <th scope="col">Traitement</th>
            <th scope="col">Données</th>
            <th scope="col">Finalité</th>
            <th scope="col">Base légale</th>
            <th scope="col">Conservation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demandes de contact</td>
            <td>
              Nom, prénom, adresse email, numéro de téléphone, contenu du message et éventuelles
              pièces jointes.
            </td>
            <td>Répondre aux demandes, préparer un projet ou un devis.</td>
            <td>Intérêt légitime / mesures précontractuelles.</td>
            <td>
              3 ans à compter du dernier contact pour un∙e prospect∙e. En cas de relation
              contractuelle : durée de la relation + 5 ans.
            </td>
          </tr>
          <tr>
            <td>Gestion des client∙e∙s et facturation</td>
            <td>
              Identité, coordonnées, informations relatives au projet, devis, factures et
              justificatifs de paiement.
            </td>
            <td>Exécution des prestations, facturation et comptabilité.</td>
            <td>Contrat / obligation légale.</td>
            <td>Durée de la relation + 5 ans. Factures : 10 ans.</td>
          </tr>
          <tr>
            <td>Journaux techniques</td>
            <td>
              Adresse IP, date et heure, URL demandée, type de navigateur, événements de sécurité.
            </td>
            <td>Sécurité, disponibilité et diagnostic du site.</td>
            <td>Intérêt légitime.</td>
            <td>6 mois maximum, sauf obligation légale ou nécessité de sécurité.</td>
          </tr>
          <tr>
            <td>Mesure d’audience</td>
            <td>
              Données techniques agrégées : pages consultées, visites, type de navigateur, pays.
            </td>
            <td>Comprendre l’audience et améliorer le site.</td>
            <td>Intérêt légitime.</td>
            <td>25 mois maximum pour les données agrégées.</td>
          </tr>
          <tr>
            <td>Contenus du portfolio</td>
            <td>
              Noms de client∙e∙s, d’artiste∙s et de photographe∙s, images, voix, crédits et
              éventuels témoignages.
            </td>
            <td>Présenter les réalisations professionnelles.</td>
            <td>Consentement / autorisation / intérêt légitime.</td>
            <td>
              Tant que le contenu est publié. Retrait possible à tout moment sur demande.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      Les appels téléphoniques ne sont pas enregistrés. Les emails sont conservés dans la messagerie
      hébergée chez Infomaniak. Les journaux techniques ne font pas l’objet de sauvegarde.
    </p>

    <h2 id="bases-legales">Bases légales</h2>
    <p>Les traitements reposent sur les bases légales suivantes :</p>
    <ul>
      <li>
        <strong>Intérêt légitime</strong> : répondre aux demandes qui nous sont adressées, sécuriser
        le site, en assurer la disponibilité et mesurer son audience de manière agrégée.
      </li>
      <li>
        <strong>Mesures précontractuelles et contrat</strong> : préparer un devis, exécuter une
        prestation et gérer la relation client∙e.
      </li>
      <li>
        <strong>Obligation légale</strong> : conserver les factures et documents comptables.
      </li>
      <li>
        <strong>Consentement</strong> : publication de contenus du portfolio (images, voix,
        témoignages) et, le cas échéant, cookies non essentiels.
      </li>
    </ul>
    <p>
      Vous pouvez vous opposer à tout moment à un traitement fondé sur l’intérêt légitime, dans les
      conditions prévues par le RGPD.
    </p>

    <h2 id="destinataires">Destinataire∙s et sous-traitant∙e∙s</h2>
    <p>
      Les données sont accessibles à Nell Vandaele uniquement. Elles peuvent être traitées par les
      prestataire∙s techniques suivants, qui agissent dans le cadre de leurs obligations
      contractuelles et de leurs engagements de conformité :
    </p>

    <div class="mt-4 overflow-x-auto">
      <table class="min-w-[680px]">
        <thead>
          <tr>
            <th scope="col">Prestataire</th>
            <th scope="col">Rôle</th>
            <th scope="col">Pays</th>
            <th scope="col">Informations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>netcup GmbH</td>
            <td>Hébergement du site, du serveur et des journaux techniques</td>
            <td>Allemagne (UE)</td>
            <td>
              <a href="https://www.netcup.com/en/helpcenter/documentation/general/dpa" target="_blank" rel="noopener">
                Accord de sous-traitance
              </a>
            </td>
          </tr>
          <tr>
            <td>Scaleway</td>
            <td>Sauvegardes</td>
            <td>France (UE)</td>
            <td>
              <a href="https://www.scaleway.com/en/privacy-policy/" target="_blank" rel="noopener">
                Politique de confidentialité
              </a>
            </td>
          </tr>
          <tr>
            <td>Infomaniak</td>
            <td>Messagerie email</td>
            <td>Suisse</td>
            <td>
              <a href="https://www.infomaniak.com/en/legal/privacy-policy" target="_blank" rel="noopener">
                Politique de confidentialité
              </a>
            </td>
          </tr>
          <tr>
            <td>Cloudflare</td>
            <td>DNS, sécurité et mesure d’audience technique</td>
            <td>États-Unis</td>
            <td>
              <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noopener">
                Accord de sous-traitance
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>
      Aucune donnée n’est vendue, louée ou cédée à des fins commerciales. Les données peuvent
      toutefois être communiquées aux autorités compétentes sur réquisition légale.
    </p>
    <p>
      Strapi et Nuxt sont hébergés sur le même serveur chez netcup. Aucun∙e autre prestataire ne
      traite les données du site à ce jour.
    </p>

    <h2 id="transferts">Transferts hors Union européenne</h2>
    <p>Les données sont principalement traitées dans l’Union européenne :</p>
    <ul>
      <li><strong>netcup</strong> : Allemagne, au sein de l’Union européenne.</li>
      <li><strong>Scaleway</strong> : France, au sein de l’Union européenne.</li>
      <li>
        <strong>Infomaniak</strong> : Suisse, pays bénéficiant d’une décision d’adéquation de la
        Commission européenne.
      </li>
      <li>
        <strong>Cloudflare</strong> : États-Unis. Cloudflare est certifié au titre du cadre de
        protection des données UE-États-Unis (EU-US Data Privacy Framework) et peut également
        recourir aux clauses contractuelles types de la Commission européenne.
      </li>
    </ul>
    <p>Aucun autre transfert hors Union européenne n’est réalisé à ce jour.</p>

    <h2 id="conservation">Durées de conservation</h2>
    <p>
      Les données sont conservées pour la durée nécessaire aux finalités décrites ci-dessus, puis
      supprimées ou anonymisées. Les durées principales sont les suivantes :
    </p>
    <ul>
      <li>Demandes de contact : 3 ans à compter du dernier contact pour un∙e prospect∙e.</li>
      <li>
        Relation client∙e : pendant la durée de la relation contractuelle, puis 5 ans pour les
        besoins de preuve et de gestion.
      </li>
      <li>Factures et documents comptables : 10 ans.</li>
      <li>Journaux techniques : 6 mois maximum, sauf obligation légale ou nécessité de sécurité.</li>
      <li>Mesure d’audience agrégée : 25 mois maximum.</li>
      <li>
        Contenus du portfolio : tant que le contenu est publié, puis retrait sur demande. Les
        sauvegardes peuvent conserver une copie pour une durée limitée avant suppression.
      </li>
    </ul>
    <p>
      Les données peuvent également être conservées plus longtemps si la loi l’exige ou pour
      constater, exercer ou défendre un droit en justice.
    </p>

    <h2 id="securite">Sécurité</h2>
    <p>
      Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger
      les données, notamment : connexion HTTPS, mots de passe robustes, accès limité à Nell
      Vandaele, mises à jour régulières et sauvegardes.
    </p>
    <p>
      Aucun système n’est infaillible. En cas d’incident de sécurité susceptible d’affecter vos
      données, les autorités compétentes seront informées lorsque la réglementation l’exige.
    </p>

    <h2 id="droits">Vos droits</h2>
    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
    <ul>
      <li>droit d’accès à vos données ;</li>
      <li>droit de rectification des données inexactes ou incomplètes ;</li>
      <li>droit à l’effacement, dans les conditions prévues par la loi ;</li>
      <li>droit à la limitation du traitement ;</li>
      <li>droit d’opposition, notamment aux traitements fondés sur l’intérêt légitime ;</li>
      <li>droit à la portabilité de vos données ;</li>
      <li>droit de retirer votre consentement à tout moment, lorsque le traitement repose sur celui-ci.</li>
    </ul>
    <p>
      Pour exercer ces droits, écrivez à
      <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a> ou par courrier à l’adresse de la
      personne responsable du traitement. Une réponse sera apportée dans un délai d’un mois, pouvant
      être prolongé de deux mois en cas de demande complexe. Une pièce d’identité peut être demandée
      en cas de doute raisonnable sur votre identité.
    </p>
    <p>
      Vous pouvez également introduire une réclamation auprès de la CNIL :
      <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener">
        www.cnil.fr/fr/plaintes
      </a>
      — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.
    </p>

    <h2 id="cookies">Cookies et traceurs</h2>
    <p>
      À ce jour, le site n’utilise pas de cookies soumis à votre consentement. Aucun bandeau de
      consentement n’est donc affiché.
    </p>
    <p>
      Des cookies ou traceurs strictement nécessaires peuvent être utilisés par l’hébergement ou
      par Cloudflare pour assurer la sécurité du site, la protection contre les attaques et son bon
      fonctionnement. Ils ne servent ni à la publicité ni au profilage.
    </p>
    <p>
      La mesure d’audience est réalisée via Cloudflare à partir de données techniques agrégées.
      Elle ne repose pas sur des cookies publicitaires et ne permet pas de vous identifier
      personnellement.
    </p>
    <p>
      Les polices, icônes et animations sont servies localement. Le site n’utilise ni Google Fonts,
      ni Google Analytics, ni pixel publicitaire.
    </p>
    <p>
      Les liens vers Instagram, WhatsApp, YouTube, Vimeo, Figma, Behance et autres services tiers
      n’installent pas de cookies avant que vous ne cliquiez. Après ouverture, les politiques de
      confidentialité de ces services s’appliquent.
    </p>
    <p>
      Si des cookies non essentiels sont ajoutés à l’avenir, un dispositif de consentement
      permettra de les accepter, de les refuser ou de les personnaliser, et de retirer votre
      consentement à tout moment. Cette politique sera mise à jour en conséquence.
    </p>
    <p>
      Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies.
      Certaines fonctionnalités du site peuvent alors être affectées.
    </p>

    <h2 id="mineurs">Mineur∙e∙s</h2>
    <p>
      Le site n’a pas vocation à collecter les données personnelles de mineur∙e∙s. Il peut toutefois
      présenter des contenus sur lesquels des mineur∙e∙s apparaissent. Toute demande de retrait peut
      être adressée à <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a>.
    </p>
    <p>
      Conformément à la réglementation, les mineur∙e∙s de moins de 15 ans doivent obtenir le
      consentement d’un∙e titulaire de l’autorité parentale avant de communiquer leurs données
      personnelles.
    </p>

    <h2 id="modification">Modification de la politique</h2>
    <p>
      La présente politique peut être mise à jour pour tenir compte de l’évolution du site, des
      services utilisés ou de la réglementation. La date de dernière mise à jour figure en haut de
      cette page. En cas de changement important, une information sera publiée sur le site.
    </p>

    <h2 id="contact">Contact</h2>
    <p>
      Pour toute question relative à cette politique ou à vos données personnelles :
      <a href="mailto:contact@nellvand.fr">contact@nellvand.fr</a>.
    </p>
    <p>
      Vous pouvez également consulter les
      <NuxtLink to="/legal">mentions légales</NuxtLink>.
    </p>
  </LegalPage>
</template>
