import type {
  CostsSection,
  Faq,
  Feature,
  Locale,
  PriceFormat,
  PricePlan,
  TechRow,
  TocEntry,
} from "./types";

export const OG_PROPOSAL = "https://www.crft.studio/lookup-open-graph.png";
export const OG_DEFAULT = "https://www.crft.studio/open-graph-img.png";

export function labels(locale: Locale) {
  if (locale === "fr") {
    return {
      stack: "Notre pile technologique principale",
      learnAstro: "En savoir plus sur Astro",
      learnSanity: "En savoir plus sur Sanity",
      whyGa4: "Pourquoi plutôt que GA4 ?",
      sitemap: "Plan du site",
      timelines: "Calendriers",
      costs: "Coûts",
      faqs: "FAQs",
      toc: "Table des matières",
      dev: "Refonte et développement du site web",
      support: "Support post-lancement",
      tech: "Pile technologique",
      month: "/mois",
      hour: "/heure",
      intro: "Introduction",
      homepage: "Page d'accueil",
      cmsCompare: "Comparer Sanity et Payload",
      phTitle: "Pourquoi nous recommandons Posthog plutôt que GA4",
      phMore: "En savoir plus",
      cmsTitle: "Sanity vs Payload",
      contact: `Contactez <a class="underline" href="mailto:jeremy@crft.studio"><span>jeremy@crft.studio</span></a> pour toute question.`,
      astroBody:
        "Framework frontend moderne et ultra‑rapide qui livre un JavaScript minimal et prend en charge plusieurs paradigmes de rendu.",
      sanityBody:
        "Sanity est un CMS headless que nous utilisons, offrant une modélisation de contenu flexible, une collaboration en temps réel et de puissantes API de contenu pour une gestion de contenu fluide.",
      posthogBody:
        "Plateforme d'analyse produit open‑source qui vous permet de suivre le comportement des utilisateurs, de mener des expériences et de construire des insights.",
    };
  }
  return {
    stack: "Our Core Tech Stack",
    learnAstro: "Learn about Astro",
    learnSanity: "Learn about Sanity",
    whyGa4: "Why over GA4?",
    sitemap: "Sitemap",
    timelines: "Timelines",
    costs: "Costs",
    faqs: "FAQs",
    toc: "Table of contents",
    dev: "Website Redesign & Development",
    support: "Post-Launch Support",
    tech: "Tech Stack",
    month: "/month",
    hour: "/hour",
    intro: "Introduction",
    homepage: "Homepage Redesign",
    cmsCompare: "Compare Sanity and Payload",
    phTitle: "Why we recommend Posthog over GA4",
    phMore: "Learn more",
    cmsTitle: "Sanity vs Payload",
    contact: `Contact <a class="underline" href="mailto:jeremy@crft.studio"><span>jeremy@crft.studio</span></a> with any questions.`,
    astroBody:
      "Ultra‑fast, modern frontend framework that ships minimal JavaScript and supports multiple rendering paradigms.",
    sanityBody:
      "Sanity is a headless CMS we use, offering flexible content modeling, real‑time collaboration, and powerful content APIs for seamless content management.",
    posthogBody:
      "Open‑source product analytics platform that lets you track user behavior, run experiments, and build insights.",
  };
}

export function tocFor(locale: Locale, homepageEnabled: boolean): TocEntry[] {
  const ui = labels(locale);
  const entries: TocEntry[] = [{ text: ui.intro, slug: "intro" }];
  if (homepageEnabled) entries.push({ text: ui.homepage, slug: "homepage-redesign" });
  entries.push(
    { text: ui.sitemap, slug: "sitemap" },
    { text: ui.timelines, slug: "timelines" },
    { text: ui.costs, slug: "costs" },
    { text: ui.faqs, slug: "faqs" },
  );
  return entries;
}

export interface CompareRow {
  label: string;
  left: string;
  right: string;
}

export function ga4Rows(locale: Locale): { leftName: string; rightName: string; rows: CompareRow[] } {
  if (locale === "fr") {
    return {
      leftName: "GA4",
      rightName: "PostHog",
      rows: [
        { label: "Propriété des données", left: "Hébergé par Google", right: "Complète (auto-hébergement/cloud)" },
        { label: "Conformité légale", left: "Politiques définies par Google", right: "Fort (Canada/UE)" },
        { label: "Configuration du suivi d'événements", left: "Manuel, nécessite GTM/Measurement Prot.", right: "Capture automatique + API + SDK" },
        { label: "Relecture de session/Carte thermique", left: "Nécessite des outils tiers", right: "Intégré" },
        { label: "Feature Flags/Test A/B", left: "Nécessite un autre produit", right: "Intégré" },
        { label: "Tarification", left: "Niveau gratuit + mise à niveau 360 coûteuse", right: "Transparente, basée sur l'usage, OSS gratuit" },
        { label: "Facilité d'utilisation", left: "Complexe, courbe d'apprentissage raide", right: "Intuitive, interface moderne" },
        { label: "Analyse qualitative", left: "Outils tiers nécessaires", right: "Directe, dans le tableau de bord" },
        { label: "Support communautaire", left: "Surtout tiers", right: "Actif et direct" },
        { label: "Tableaux de bord personnalisés", left: "BigQuery requis pour analyse approfondie", right: "Puissants, options SQL/ClickHouse" },
        { label: "Fonctionnalités IA/ML", left: "ML mature (meilleur pour les annonces)", right: "Assistée par IA, moderne" },
      ],
    };
  }
  return {
    leftName: "GA4",
    rightName: "PostHog",
    rows: [
      { label: "Data Ownership", left: "Google-hosted", right: "Full (self-host/cloud)" },
      { label: "Privacy Law Fit", left: "Google-defined policies", right: "Strong (Canada/EU)" },
      { label: "Event Tracking Setup", left: "Manual, needs GTM/Measurement Prot.", right: "Autocapture + API + SDK" },
      { label: "Session Replay/Heatmap", left: "Requires third-party tools", right: "Built-in" },
      { label: "Feature Flags/A/B Test", left: "Needs another product", right: "Built-in" },
      { label: "Pricing", left: "Free tier + expensive 360 upgrade", right: "Transparent, usage-based, free OSS" },
      { label: "Ease of Use", left: "Complex, steep learning curve", right: "Intuitive, modern UI" },
      { label: "Qualitative Analysis", left: "Third-party tools needed", right: "Direct, in-dashboard" },
      { label: "Community Support", left: "Mostly third-party", right: "Active & direct" },
      { label: "Custom Dashboards", left: "BigQuery required for deep analysis", right: "Powerful, SQL/ClickHouse options" },
      { label: "AI/ML Features", left: "Mature ML (best for ads)", right: "AI-assisted, modern" },
    ],
  };
}

export function cmsComparison(locale: Locale): {
  leftName: string;
  rightName: string;
  rows: CompareRow[];
  summaryLabel: string;
  summary: string;
} {
  if (locale === "fr") {
    return {
      leftName: "Sanity",
      rightName: "Payload CMS",
      summaryLabel: "Résumé",
      summary:
        "Payload a une parité de fonctionnalités quasi équivalente avec Sanity, et offre une expérience d'édition de contenu similaire. Sanity offre une configuration et une maintenance à long terme plus fluides avec une infrastructure gérée. CRFT utilise Sanity comme CMS. Payload figure ici seulement comme comparaison pour les équipes qui évaluent une option auto-hébergée. Nous ne mettons pas Payload en œuvre.",
      rows: [
        {
          label: "Tarification",
          left: "Niveau gratuit : inclut jusqu'à 20 sièges utilisateur, 2 rôles de permission, 2 jeux de données, types de contenu et langues illimités. Niveau Growth : 15 $ USD/utilisateur/mois",
          right: "OSS gratuit auto-hébergé : utilisateurs, rôles de permission, jeux de données, langues illimités, etc",
        },
        {
          label: "Dépendance Dev continue",
          left: "Faible ; cloud géré, DevOps minimal",
          right: "Moyenne ; l'auto-hébergement nécessite une gestion d'infrastructure",
        },
        {
          label: "Fonctionnalités",
          left: "Édition visuelle/en direct, gestion des ressources, localisation, flux de publication, versioning, et plus",
          right: "Parité de fonctionnalités quasi équivalente : Gestion des ressources, localisation, flux de publication, versioning, et plus",
        },
        {
          label: "Propriété des données",
          left: "Conforme RGPD/SOC2, base de données hébergée dans le cloud, avec export de données complet",
          right: "Contrôle complet ; base de données auto-hébergée (MongoDB/Postgres/etc)",
        },
        {
          label: "Hébergement et évolutivité",
          left: "Auto-hébergeable, client OSS, avec une base de données hébergée dans le cloud derrière un CDN mondial",
          right: "Client et base de données auto-hébergés/cloud ; mise à l'échelle manuelle, contrôle complet des performances",
        },
        {
          label: "Communauté et support",
          left: "Grande (180k+ développeurs), docs/plugins, SLAs entreprise",
          right: "En croissance (30k+ étoiles), GitHub actif, acquisition récente par Figma",
        },
      ],
    };
  }
  return {
    leftName: "Sanity",
    rightName: "Payload CMS",
    summaryLabel: "Summary",
    summary:
      "Payload has near feature parity with Sanity, and offers a similar content editing experience. Sanity offers a more seamless setup and long-term maintenance with managed infrastructure. CRFT uses Sanity as its CMS. Payload is listed only as a comparison for teams weighing a self-hosted option. We do not implement Payload.",
    rows: [
      {
        label: "Pricing",
        left: "Free tier: includes up to 20 user seats, 2 permission roles, 2 datasets, unlimited content types and locales. Growth tier: $15 USD/user/month",
        right: "Free OSS self-host: unlimited users, permission roles, datasets, locales, etc",
      },
      {
        label: "Ongoing Dev Dependency",
        left: "Low; managed cloud, minimal DevOps",
        right: "Medium; self-host requires infrastructure management",
      },
      {
        label: "Features",
        left: "Visual/live editing, asset management, localization, publishing workflows, versioning, and more",
        right: "Near feature-parity: Asset management, localization, publishing workflows, versioning, and more",
      },
      {
        label: "Data Ownership",
        left: "GDPR/SOC2 compliant, cloud-hosted database, albeit with full data export",
        right: "Complete control; self-hosted DB (MongoDB/Postgres/etc)",
      },
      {
        label: "Hosting and Scalability",
        left: "Self-hostable, OSS client, with a cloud-hosted database behind a global CDN",
        right: "Self/cloud client and database; manual scaling, full perf control",
      },
      {
        label: "Community and Support",
        left: "Large (180k+ devs), docs/plugins, enterprise SLAs",
        right: "Growing (30k+ stars), active GitHub, recent Figma acquisition",
      },
    ],
  };
}

export function devTabs(locale: Locale) {
  if (locale === "fr") {
    return [
      { id: "monthly", label: "Mensuel" },
      { id: "quarterly", label: "Trimestriel (Économisez 12%)" },
      { id: "sixmonth", label: "6 Mois (Économisez 18%)" },
    ];
  }
  return [
    { id: "monthly", label: "Monthly" },
    { id: "quarterly", label: "Quarterly (Save 12%)" },
    { id: "sixmonth", label: "6 Months (Save 18%)" },
  ];
}

export function supportTabs(locale: Locale) {
  if (locale === "fr") {
    return [
      { id: "hourly", label: "Horaire" },
      { id: "bundle5", label: "5 Heures (Économisez 5%)" },
      { id: "bundle10", label: "10 Heures (Économisez 10%)" },
      { id: "bundle20", label: "20 Heures (Économisez 15%)" },
      { id: "bundle30", label: "30 Heures (Économisez 20%)" },
      { id: "bundle40", label: "40 Heures (Économisez 25%)" },
    ];
  }
  return [
    { id: "hourly", label: "Hourly" },
    { id: "bundle5", label: "5 Hours (Save 5%)" },
    { id: "bundle10", label: "10 Hours (Save 10%)" },
    { id: "bundle20", label: "20 Hours (Save 15%)" },
    { id: "bundle30", label: "30 Hours (Save 20%)" },
    { id: "bundle40", label: "40 Hours (Save 25%)" },
  ];
}

export function priceFormatFor(locale: Locale, currency: "CAD" | "USD"): PriceFormat {
  if (locale === "fr" && currency === "CAD") return "fr-suffix";
  return "en-prefix";
}

/** 12% and 18% off, rounded to the nearest dollar. Cyberimpact keeps its historical rounded rates instead. */
export function discounted(monthly: number) {
  return {
    monthly,
    quarterly: Math.round(monthly * 0.88),
    sixmonth: Math.round(monthly * 0.82),
  };
}

export function supportPrices(currency: "CAD" | "USD") {
  if (currency === "USD") {
    return { hourly: 75, bundle5: 71, bundle10: 68, bundle20: 64, bundle30: 60, bundle40: 56 };
  }
  return { hourly: 100, bundle5: 95, bundle10: 90, bundle20: 85, bundle30: 80, bundle40: 75 };
}

function plan(
  locale: Locale,
  currency: "CAD" | "USD",
  prices: Record<string, number>,
  tabs: { id: string; label: string }[],
  period: "month" | "hour",
  format?: PriceFormat,
): PricePlan {
  const ui = labels(locale);
  return {
    prices,
    tabs,
    currencyLabel: currency,
    periodLabel: period === "month" ? ui.month : ui.hour,
    priceFormat: format ?? priceFormatFor(locale, currency),
  };
}

export function features(locale: Locale): Feature[] {
  if (locale === "fr") {
    return [
      {
        title: "Travaux de design dans Figma/Sketch",
        body: "Nous utilisons Figma ou Sketch uniquement pour les premiers concepts, puis passons rapidement au design haute fidélité en code. Cela nous permet de collaborer en temps réel et de livrer des résultats beaucoup plus rapidement, en affinant au fur et à mesure que nous construisons.",
      },
      {
        title: "Développement web personnalisé",
        body: "Astro est notre framework de choix. Attendez-vous à une performance éclair, un SEO technique solide et un environnement séparé pour prévisualiser les mises à jour avant leur mise en ligne.",
      },
      {
        title: "Intégration CMS headless",
        body: "Nous intégrerons Sanity CMS dans notre projet, entièrement auto-hébergeable avec propriété des données, pour que votre équipe puisse mettre à jour et collaborer sur le contenu en temps réel, sans notre intervention.",
      },
      {
        title: "Progrès quotidiens et mises à jour en direct",
        body: "Nous acceptons un petit nombre de clients à la fois pour assurer un partenariat étroit et constant.",
      },
      {
        title: "Gestion de projet (dans Basecamp)",
        body: "Cela garde tout organisé et au même endroit, des messages aux fichiers, éléments à faire, et plus. Vous allez adorer.",
      },
      {
        title: "Appel vidéo hebdomadaire (sur demande)",
        body: "Il y a des occasions où la communication synchrone aide vraiment. Pour ces moments, n'hésitez pas à demander un appel.",
      },
      {
        title: "Pause ou annulation à tout moment",
        body: "Lorsque notre travail ensemble est terminé, vous êtes invité à mettre en pause ou annuler votre abonnement jusqu'à ce que vous ayez besoin de nous à nouveau.",
      },
      {
        title: "Garantie satisfait ou remboursé de 7 jours",
        body: "Il n'y a aucune condition. Si vous n'aimez pas notre travail dans les 7 premiers jours de votre abonnement, nous vous rembourserons 100% de votre argent.",
      },
    ];
  }
  return [
    {
      title: "Design work in Figma/Sketch",
      body: "We use Figma or Sketch only for early concepts, then quickly move to high-fidelity design in code. This lets us collaborate in real time and deliver results much faster, refining as we build.",
    },
    {
      title: "Custom web development",
      body: "Astro is our framework of choice. Expect lightning performance, solid technical SEO, and a separate environment to preview updates before they go live.",
    },
    {
      title: "Headless CMS integration",
      body: "We'll integrate Sanity CMS into our project, fully self-hostable with data ownership, so your team can update and collaborate on content in realtime, without our input.",
    },
    {
      title: "Daily progress & live updates",
      body: "We take in a small number of clients at a time to ensure a close, consistent partnership.",
    },
    {
      title: "Project management (in Basecamp)",
      body: "It keeps everything neat and in one place, from messages, to files, to-do items, and more. You'll love it.",
    },
    {
      title: "Weekly video call (on request)",
      body: "There are occasions where synchonous communcation really helps. For those times, do not hesitate to request a call.",
    },
    {
      title: "Pause or cancel anytime",
      body: "When our work together is done, you're welcome to pause or cancel your subscription until you need us next.",
    },
    {
      title: "7-day money-back guarantee",
      body: "There are no strings attached. If you don't like our work within the first 7 days of your subscription, we'll refund 100% of your money.",
    },
  ];
}

export function baseFaqs(locale: Locale): Faq[] {
  if (locale === "fr") {
    return [
      {
        question: "Quelles technologies utilisez-vous pour construire des sites web ?",
        answer:
          "Nous utilisons Astro pour un développement frontend moderne et ultra-rapide, combiné avec Sanity comme CMS headless puissant et flexible pour une gestion de contenu facile. Cette pile offre performance et une expérience d'édition fluide.",
      },
      {
        question: "Notre équipe pourra-t-elle modifier le site web elle-même ?",
        answer:
          "Absolument. Le CMS de Sanity offre un environnement d'édition intuitif et en temps réel qui permet à votre équipe de mettre à jour le texte, les images et même les mises en page—sans développeur requis.",
      },
      {
        question: "Peut-il être hébergé sur notre propre infrastructure ?",
        answer:
          "Oui. Le frontend Astro peut être déployé comme une application Node où vous le souhaitez. Le client d'édition de contenu de Sanity, Sanity Studio, est open source et auto-hébergeable, mais la base de données sous-jacente est hébergée dans le cloud.",
      },
      {
        question: "Combien de développement/maintenance continue est nécessaire ?",
        answer:
          "Très peu. Nos sites sont conçus pour une faible maintenance, avec la plupart des mises à jour gérées facilement par votre équipe dans Sanity. Nous sommes toujours disponibles pour les changements majeurs, le support ou les nouvelles fonctionnalités.",
      },
      {
        question: "Le nouveau système est-il plus difficile à utiliser que WordPress ?",
        answer:
          "Non—l'inverse. Sanity offre une interface moderne et conviviale adaptée à votre contenu, pas seulement aux articles de blog. De nombreux clients le trouvent plus rapide et plus intuitif que le tableau de bord WordPress traditionnel, surtout pour les utilisateurs non techniques.",
      },
      {
        question: "Que se passe-t-il si nous avons besoin de nouvelles fonctionnalités après le lancement ?",
        answer:
          "Nous offrons un support continu ! Que vous ayez besoin de nouvelles pages, d'intégrations supplémentaires ou de fonctionnalités avancées, nous pouvons rapidement évaluer et implémenter les mises à jour à mesure que vos besoins évoluent.",
      },
      {
        question: "Comment gérez-vous les délais et les retours ?",
        answer:
          "Nous divisons les projets en phases claires avec des jalons et des livrables définis. Vous recevrez des mises à jour régulières et des liens de prévisualisation via Basecamp (notre logiciel de gestion de projet de choix), et vos retours sont intégrés à chaque étape du processus.",
      },
    ];
  }
  return [
    {
      question: "What technologies do you use to build websites?",
      answer:
        "We use Astro for ultra-fast, modern frontend development, combined with Sanity as a powerful and flexible headless CMS for easy content management. This stack delivers performance, and a seamless editing experience.",
    },
    {
      question: "Will our team be able to edit the website ourselves?",
      answer:
        "Absolutely. Sanity's CMS offers intuitive, real-time editing environment lets your team update copy, images, and even page layouts—no developer required.",
    },
    {
      question: "Can it be hosted on our own infrastructure?",
      answer:
        "Yes. The Astro frontend can be deployed as a Node application wherever you choose. Sanity's content editing client, Sanity Studio, is open source and self-hostable, but the underlying database is cloud-hosted.",
    },
    {
      question: "How much ongoing dev/maintenance is needed?",
      answer:
        "Very little. Our sites are designed for low maintenance, with most updates handled easily by your team in Sanity. We're always available for major changes, support, or new features.",
    },
    {
      question: "Is the new system harder to use than WordPress?",
      answer:
        "No—the opposite. Sanity offers a modern, user-friendly interface tailored for your content, not just blog posts. Many clients find it quicker and more intuitive than the traditional WordPress dashboard, especially for non-technical users.",
    },
    {
      question: "What if we need new features after launch?",
      answer:
        "We offer ongoing support! Whether you need new pages, additional integrations, or advanced features, we can quickly scope and implement updates as your needs evolve.",
    },
    {
      question: "How do you handle timelines and feedback?",
      answer:
        "We break projects into clear phases with defined milestones and deliverables. You'll receive regular progress updates and preview links via Basecamp (our project management software of choice), and your feedback is built into every step of the process.",
    },
  ];
}

export function techTable(locale: Locale): { columns: [string, string, string]; rows: TechRow[]; total: { service: string; cost: string } } {
  if (locale === "fr") {
    return {
      columns: ["Service", "Coût mensuel", "Notes"],
      rows: [
        { service: "Astro", cost: "0 $", notes: "Framework frontend gratuit, open-source, auto-hébergeable" },
        { service: "Sanity CMS", cost: "15 $ USD/utilisateur/mois (plan Growth)", notes: "Gratuit" },
        { service: "PostHog", cost: "0 $", notes: "Le niveau gratuit généreux couvre l'utilisation pour plus de 90% de leurs utilisateurs (1M événements/mois)" },
        { service: "GitHub", cost: "0 $", notes: "Gratuit pour des dépôts publics et privés illimités" },
      ],
      total: { service: "Coût mensuel total de la pile technologique", cost: "15 $ USD/utilisateur/mois" },
    };
  }
  return {
    columns: ["Service", "Monthly Cost", "Notes"],
    rows: [
      { service: "Astro", cost: "$0", notes: "Free, open-source, self-hostable frontend framework" },
      { service: "Sanity CMS", cost: "$15 USD/per user/month (Growth plan)", notes: "Free" },
      { service: "PostHog", cost: "$0", notes: "Generous free tier covers usage for over 90% of their users (1M events/month)" },
      { service: "GitHub", cost: "$0", notes: "Free for unlimited public and private repositories" },
    ],
    total: { service: "Total Monthly Tech Stack Cost", cost: "$15 USD/per user/month" },
  };
}

export function costs(opts: {
  locale: Locale;
  currency: "CAD" | "USD";
  monthly: number;
  quarterly: number;
  sixmonth: number;
  devSummaryHtml: string;
  supportSummaryHtml: string;
  techIntroHtml: string;
  priceFormat?: PriceFormat;
  extraFeatures?: Feature[];
}): CostsSection {
  const ui = labels(opts.locale);
  const table = techTable(opts.locale);
  return {
    heading: ui.costs,
    devLabel: ui.dev,
    dev: plan(
      opts.locale,
      opts.currency,
      { monthly: opts.monthly, quarterly: opts.quarterly, sixmonth: opts.sixmonth },
      devTabs(opts.locale),
      "month",
      opts.priceFormat,
    ),
    devSummaryHtml: opts.devSummaryHtml,
    features: [...features(opts.locale), ...(opts.extraFeatures ?? [])],
    supportLabel: ui.support,
    support: plan(opts.locale, opts.currency, supportPrices(opts.currency), supportTabs(opts.locale), "hour", opts.priceFormat),
    supportSummaryHtml: opts.supportSummaryHtml,
    techLabel: ui.tech,
    techIntroHtml: opts.techIntroHtml,
    techColumns: table.columns,
    techRows: table.rows,
    techTotal: table.total,
  };
}

export const TODO_HEADING = "TODO for Jeremy — remove this block before sending";

export function supportSummary(locale: Locale, currency: "CAD" | "USD") {
  if (locale === "fr") {
    return "Un support horaire flexible est disponible pour les besoins de développement continus, et vous pouvez opter pour des forfaits d'heures pour économiser sur les mises à jour importantes ou les nouvelles fonctionnalités. Nous restons disponibles après le lancement pour aider avec les optimisations, les mises à jour ou les ajouts de fonctionnalités, pour que vous ayez accès au support chaque fois que vous en avez besoin.";
  }
  const money = currency === "USD" ? "USD" : "CAD";
  if (currency === "USD") {
    return `Flexible hourly support is available for ongoing development needs, priced in ${money}, and you can opt for bundled hours to save on larger updates or new features. We remain available post-launch to help with optimizations, updates, or feature additions, so you have access to support whenever you need it.`;
  }
  return "Flexible hourly support is available for ongoing development needs, and you can opt for bundled hours to save on larger updates or new features. We remain available post-launch to help with optimizations, updates, or feature additions, so you have access to support whenever you need it.";
}
