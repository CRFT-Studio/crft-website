import type { Proposal } from "./types";
import { OG_DEFAULT, TODO_HEADING, baseFaqs, costs, labels, supportSummary, tocFor } from "./shared";

const locale = "fr" as const;
const ui = labels(locale);

const proposal: Proposal = {
  locale,
  clientName: "FCFA du Canada",
  clientUrl: "https://fcfa.ca/",
  title: "Proposition — refonte de fcfa.ca",
  metaTitle: "Proposition FCFA du Canada | CRFT Studio",
  metaDescription:
    "Proposition pour la refonte du site principal de la FCFA du Canada : architecture, interface, accessibilité, CMS et formation, d'ici le 30 avril 2027.",
  ogImageUrl: OG_DEFAULT,
  currentLangLabel: "FR",
  introHtml: `
    <p class="text-neutral-400 mb-6">La FCFA cherche une refonte complète de fcfa.ca, son portail principal. Le site doit présenter la Fédération, ses 24 membres et son mandat, rendre visibles les prises de position pour les décideurs et les journalistes, ouvrir des vitrines vers les grandes initiatives, offrir un répertoire de ressources, afficher les emplois, et garder un lien vers l'intranet déjà en place. La navigation doit rester fluide, sans enfermer chaque public dans un silo.</p>
    <p class="text-neutral-400 mb-6">Le mandat porte sur fcfa.ca seulement. immigrationfrancophone.ca, francite.ca et cartefrancophonie.ca ne sont pas à refaire. Comme une partie des contenus d'immigrationfrancophone.ca doit revenir vers le site principal, nous prévoyons les emplacements et les modèles pour les recevoir. La carte de la francophonie et Francité restent des liens. L'intranet membre reste la plateforme actuelle. Nous conservons l'entrée, nous ne la reconstruisons pas.</p>
    <p class="text-neutral-400 mb-4">Ce que la proposition couvre, aligné sur les livrables de l'appel :</p>
    <ul class="text-neutral-300 text-lg list-disc pl-5 flex flex-col gap-2 mb-6">
      <li>Analyse du site actuel et de son lien avec les sites secondaires, puis une architecture validée avec vous.</li>
      <li>Deux concepts d'interface et trois rondes de corrections, inclus dans l'abonnement, pas en supplément. La charte graphique de la FCFA est respectée.</li>
      <li>Développement Astro, contenus intégrés à partir de ce que la FCFA fournit, et adaptation mobile.</li>
      <li>Accessibilité selon WCAG 2.2 AA. L'appel parle de « normes d'accessibilité web » sans nommer une norme. Nous partons de WCAG 2.2 AA, le niveau le plus courant pour un site public canadien de cette envergure.</li>
      <li>Sanity comme CMS. C'est le CMS que CRFT met en œuvre. L'équipe publie actualités, prises de position, ressources et offres d'emploi sans programmation. Formation et guide inclus.</li>
      <li>SEO de base : titres, descriptions, redirections des URL actuelles, données structurées sur les actualités et les offres d'emploi.</li>
      <li>Mise en ligne au plus tard le 30 avril 2027, avec transfert des accès, du code et des sources à la FCFA.</li>
      <li>Un plan de soins après le lancement, à l'heure, décrit plus bas. Pas un hébergement opaque.</li>
    </ul>
    <p class="text-neutral-400">Les montants sont en dollars canadiens, avant taxes. L'appel demande un budget. Notre modèle est un abonnement mensuel pour la durée du travail. Au tarif publié de 6 850 $ CAD par mois pendant six mois, le total estimé est de 41 100 $ CAD avant taxes. Un départ en novembre 2026 mène à une mise en ligne d'ici la fin avril 2027. Le prépaiement trimestriel ou sur six mois réduit le tarif mensuel de 12 % et de 18 % (6 000 $ et 5 600 $ CAD).</p>
  `,
  homepage: {
    enabled: true,
    heading: "Sites publics consultés",
    bodyHtml:
      "Sites publics d'organisations qui publient des positions, des membres et des ressources pour des publics différents. Ce sont des références d'inspiration, pas des clients de CRFT. Cette page ne contient pas de maquette annotée.",
    competitors: [
      { name: "Commissariat aux langues officielles", url: "https://www.clo-ocol.gc.ca/", note: "Clarté des dossiers et des publications pour un public institutionnel" },
      { name: "Assemblée de la francophonie de l'Ontario", url: "https://monassemblee.ca/", note: "Organisme porte-parole, actualités et dossiers" },
      { name: "Société Santé en français", url: "https://www.santefrancais.ca/", note: "Réseau national, ressources et actualités dans une même navigation" },
    ],
  },
  showCmsCompare: true,
  sitemap: {
    heading: ui.sitemap,
    noteHtml:
      "Proposé à partir de l'appel de propositions et des pages publiques actuelles (La FCFA, Ce que nous faisons, actualités, membres, ressources, événements, espace membre). Les dizaines de pages d'intranet (espace-membre-politique, vivre-ensemble, immigration, gouvernance) restent dans l'intranet existant. Elles ne sont pas refaites ici.",
    groups: [
      {
        title: "Accueil",
        items: [
          { label: "Page d'accueil", note: "La Fédération, une position récente, une voie vers les dossiers et les membres" },
          { label: "Recherche" },
          { label: "Contact" },
        ],
      },
      {
        title: "La FCFA",
        items: [
          { label: "Mandat et histoire" },
          { label: "Équipe" },
          { label: "Membres", note: "Les organismes membres, pas l'intranet" },
          { label: "Carte de la francophonie", note: "Lien vers cartefrancophonie.ca" },
          { label: "Carrières", note: "Offres publiées dans le CMS" },
        ],
      },
      {
        title: "Ce que nous faisons",
        items: [
          { label: "Prises de position", note: "Mises de l'avant pour les décideurs et les médias" },
          { label: "Politiques publiques" },
          { label: "Immigration francophone", note: "Y compris les contenus qui quittent immigrationfrancophone.ca" },
          { label: "Vivre-ensemble" },
          { label: "Francité", note: "Passerelle vers francite.ca" },
        ],
      },
      {
        title: "Ressources et actualités",
        items: [
          { label: "Actualités" },
          { label: "Événements" },
          { label: "Répertoire de publications et de ressources" },
          { label: "Rapports, dont le rapport annuel" },
        ],
      },
      {
        title: "Membres",
        items: [
          { label: "Intranet", note: "Lien vers la plateforme actuelle, sans refonte" },
        ],
      },
    ],
  },
  timeline: {
    heading: ui.timelines,
    totalLabel: "Durée estimée : 6 mois, mise en ligne au plus tard le 30 avril 2027",
    phases: [
      {
        name: "Démarrage",
        duration: "Jour 1",
        items: [
          "Rencontre avec le coordonnateur de la promotion et du marketing",
          "Accès au site WordPress actuel, à la charte et à la liste des contenus qui migrent depuis immigrationfrancophone.ca",
          "Basecamp et un calendrier calé sur le 30 avril 2027",
        ],
      },
      {
        name: "Analyse et architecture",
        duration: "3 semaines",
        items: [
          "Lecture du site actuel et du rôle des sites secondaires",
          "Architecture proposée, puis ajustée avec la FCFA avant le design",
          "Inventaire : ce qui migre, ce qui reste un lien, ce que la FCFA doit encore rédiger",
        ],
      },
      {
        name: "Deux concepts et corrections",
        duration: "4 semaines",
        items: [
          "Deux directions d'interface sur la page d'accueil et une page intérieure, dans la charte FCFA",
          "Trois rondes de corrections sur la direction retenue",
          "Le design détaillé se fait ensuite dans le code, pas dans une longue série de maquettes",
        ],
      },
      {
        name: "Développement",
        duration: "10 à 12 semaines",
        items: [
          "Modèles Sanity pour les actualités, positions, ressources, membres, emplois et pages",
          "Pages publiques, recherche, mobile, prévisualisation",
          "SEO technique et balisage des actualités et des offres",
          "Emplacements prêts pour les contenus d'immigration qui déménagent",
        ],
      },
      {
        name: "Contenus, accessibilité, formation, mise en ligne",
        duration: "4 semaines",
        items: [
          "Intégration des contenus fournis par la FCFA et redirections",
          "Vérification WCAG 2.2 AA sur les modèles et les parcours principaux",
          "Formation de l'équipe et guide écrit",
          "Mise en ligne, transfert du dépôt, de Sanity et des accès. Échéance : 30 avril 2027",
        ],
      },
      {
        name: "Plan de soins",
        duration: "Après le lancement",
        items: [
          "Correctifs des premières semaines inclus dans le sixième mois si le lancement tombe en avril",
          "Ensuite, banques d'heures décrites plus bas",
          "La FCFA reste propriétaire du code, des contenus et des accès",
        ],
      },
    ],
  },
  costs: costs({
    locale,
    currency: "CAD",
    monthly: 6850,
    quarterly: 6000,
    sixmonth: 5600,
    devSummaryHtml:
      "Tous les montants de cette section sont en dollars canadiens, avant taxes. 6 850 $ CAD par mois pendant six mois, soit environ 41 100 $ CAD, couvrent l'analyse, l'architecture, deux concepts, trois rondes de corrections, le développement, l'intégration des contenus fournis, l'accessibilité WCAG 2.2 AA, la formation, le guide et la mise en ligne de fcfa.ca d'ici le 30 avril 2027. Les onglets trimestriel et 6 mois affichent le tarif mensuel après une réduction de 12 % et de 18 %. Ne sont pas inclus : la refonte d'immigrationfrancophone.ca, de francite.ca, de cartefrancophonie.ca et de l'intranet, ni la rédaction de nouveaux textes de fond. L'hébergement et la pile du tableau suivant sont payés par la FCFA.",
    supportSummaryHtml: supportSummary(locale, "CAD"),
    techIntroHtml:
      "Ces coûts sont facturés à la FCFA, pas à CRFT. Le total correspond au plan Growth de Sanity, par utilisateur. L'hébergement du site Astro est en plus. CRFT ne possède pas une flotte de serveurs. Le site se déploie sur l'infrastructure de la FCFA ou sur un hébergeur au nom de la FCFA. Le choix précis et son prix se confirment au démarrage.",
  }),
  faqsHeading: ui.faqs,
  faqs: [
    ...baseFaqs(locale),
    {
      question: "Les deux concepts et les trois rondes sont-ils en plus du mensuel ?",
      answer:
        "Non. Ils font partie des six mois. Un troisième concept complet, ou une refonte de la marque, serait un avenant.",
    },
    {
      question: "L'intranet et la carte sont-ils inclus ?",
      answer:
        "Non. L'intranet actuel reste en place et le nouveau site y mène. cartefrancophonie.ca et francite.ca restent des liens. Nous préparons fcfa.ca à recevoir les contenus publics qui quittent immigrationfrancophone.ca. Nous ne refaisons pas ce site.",
    },
    {
      question: "Quelle accessibilité livrez-vous ?",
      answer:
        "WCAG 2.2 niveau AA sur les modèles publics : contraste, clavier, intitulés de formulaires, titres, et textes de remplacement demandés par le CMS. Avant la mise en ligne, une passe outillée et une passe manuelle sur l'accueil, une prise de position, le répertoire et une offre d'emploi. Nous corrigeons ce qui échoue. Nous ne délivrons pas une certification officielle.",
    },
    {
      question: "Qui possède le site à la fin ?",
      answer:
        "La FCFA. Code, contenus, fichiers sources et accès d'administration sont transférés. Sanity permet d'exporter les contenus. Le guide de formation est remis avec la formation.",
    },
  ],
  contactHtml: ui.contact,
  tocTitle: ui.toc,
  toc: tocFor(locale, true),
  todos: {
    heading: TODO_HEADING,
    items: [
      "L'appel exige deux références de clients pour des mandats d'envergure comparable. Ne pas en inventer. Le portfolio public (/customers) montre des sites marketing, pas des fédérations.",
      "L'appel exige aussi une courte présentation de la firme (date de création, équipe, projets). Ne pas inventer une année de fondation ni un effectif. Jeremy Vejgman, fondateur, jeremy@crft.studio, est public sur le site. Renvoyer vers /about-us et /customers pour le reste.",
      "L'appel demande les serveurs dont dispose la firme. La page dit que CRFT n'opère pas une flotte privée et que le site se déploie chez la FCFA ou sur un hébergeur à son nom. Confirmer l'hébergeur et un prix si la FCFA veut que CRFT le revende.",
      "L'appel dit « normes d'accessibilité web » sans préciser. La page propose WCAG 2.2 AA. Confirmer si la Norme sur l'accessibilité des sites Web du gouvernement du Canada ou SGQRI 008 s'applique.",
      "Deux concepts et trois rondes sont inclus dans les six mois (6 850 $ CAD × 6 = 41 100 $ CAD avant taxes). Confirmer que c'est bien ainsi que tu veux le vendre.",
      "Le plan de soins est aux banques d'heures. Ajouter un prix annuel fixe si la FCFA le demande.",
      "Envoyer à Anouar Sfayhi, asfayhi@fcfa.ca, au plus tard le vendredi 30 octobre 2026 à midi (HE). Le PDF en ligne est https://fcfa.ca/wp-content/uploads/2026/10/Appel-de-propositions-refonte-du-site-de-la-FCFA-2026.pdf (l'URL du brief initial répond 404).",
    ],
  },
};

export default proposal;
