import type { Locale, Proposal } from "./types";
import { OG_PROPOSAL, baseFaqs, costs, labels, supportSummary, tocFor } from "./shared";

const homepage = {
  enabled: false,
  heading: "Homepage Redesign",
  bodyHtml:
    'We reviewed the homepages of your key competitors—Mailchimp, Envoke, Flodesk, CakeMail, LeadFox, and ContactMonkey—and distilled the best elements into a new homepage draft for CyberImpact. Want to see exactly what inspired each section? Check out our <span class="underline"><a href="https://cyberimpact-website.vercel.app/notes" target="_blank">design annotations</a></span> for a peek at what made the cut.',
  competitors: [
    { name: "Mailchimp", url: "https://mailchimp.com/" },
    { name: "Envoke", url: "https://envoke.com/" },
    { name: "Flodesk", url: "https://flodesk.com/" },
    { name: "CakeMail", url: "https://www.cakemail.com/" },
    { name: "LeadFox", url: "https://www.leadfox.co/" },
    { name: "ContactMonkey", url: "https://www.contactmonkey.com/" },
  ],
  redesign: {
    title: "CyberImpact",
    description: "A fully annotated redesign implementation of CyberImpact's homepage",
    url: "https://cyberimpact-website.vercel.app/",
    linkLabel: "Visit website",
    embedUrl: "https://cyberimpact-website.vercel.app/",
  },
};

function timeline(locale: Locale) {
  if (locale === "fr") {
    return {
      heading: "Calendriers",
      totalLabel: "Durée estimée du projet : 3 mois",
      phases: [
        {
          name: "Intégration",
          duration: "Jour 1",
          items: [
            "Projet commencé",
            "Invitation au projet Basecamp envoyée",
            "Réunion de lancement (optionnelle)",
            'Nous analysons votre site web en utilisant <span><a href="/lookup" class="text-orange-300 underline">CRFT Lookup</a></span>, pour voir son score Lighthouse, sa pile technologique, la structure du plan de site et les balises meta.',
          ],
        },
        {
          name: "Développement Web",
          duration: "8 - 12 semaines",
          items: [
            "Création du dépôt de code",
            "Design et développement haute fidélité et responsive des pages principales et composants",
            "Migration de contenu et configuration de Sanity, notre CMS de choix",
            "Nous rédigeons et/ou collaborons sur le nouveau contenu pour chaque page",
            "Intégration d'outils tiers (ex : analytics, consentement cookies, etc)",
            "Tests QA (responsivité cross-navigateur/appareil, Lighthouse, etc)",
            "Configuration DNS et lancement",
          ],
        },
        {
          name: "Transfert",
          duration: "~ 1 semaine",
          items: [
            "Transfert du dépôt Github et transfert de propriété",
            "Partage du compte Sanity CMS et configuration des accès",
            "Conseils de déploiement pour l'application Astro (NodeJS) sur votre infrastructure",
            "Documentation et aide pour la maintenance continue",
          ],
        },
        {
          name: "Maintenance du site web",
          duration: "Continue (ou optionnelle/selon besoin)",
          items: [
            "Optimisation des performances et améliorations de vitesse",
            "Surveillance de sécurité et mises à jour",
            "Création de nouvelles landing pages",
            "Création de nouveaux outils SEO gratuits",
            "Surveillance et rapports analytiques",
            "Support technique 24/7",
          ],
        },
      ],
    };
  }
  return {
    heading: "Timelines",
    totalLabel: "Estimated project duration: 3 months",
    phases: [
      {
        name: "Onboarding",
        duration: "Day 1",
        items: [
          "Project begun",
          "Basecamp project invite sent",
          "Kick-off meeting (optional)",
          'We scan your website using the <span><a href="/lookup" class="text-orange-300 underline">CRFT Lookup</a></span>, to see its Lighthouse score, tech stack, sitemap structure and meta tags.',
        ],
      },
      {
        name: "Web Development",
        duration: "8 - 12 weeks",
        items: [
          "Creation of code repository",
          "High fidelity, responsive design and development of core pages & components",
          "Content migration and setup of Sanity, our CMS of choice",
          "We write and/or collaborate on new copy for every page",
          "Integration of third-party tools (e.g. analytics, cookie consent, etc)",
          "QA testing (cross-browser/device responsiveness, Lighthouse, etc)",
          "DNS configuration and launch",
        ],
      },
      {
        name: "Handover",
        duration: "~ 1 week",
        items: [
          "Github repository transfer and ownership handover",
          "Sanity CMS account sharing and access setup",
          "Deployment guidance for Astro (NodeJS) application on your infrastructure",
          "Documentation and help for ongoing maintenance",
        ],
      },
      {
        name: "Website Maintenance",
        duration: "Ongoing (or optional/as-needed)",
        items: [
          "Performance optimization and speed enhancements",
          "Security monitoring and updates",
          "New landing page creation",
          "New free SEO tool creation",
          "Analytics monitoring and reporting",
          "24/7 technical support",
        ],
      },
    ],
  };
}

export function cyberimpactProposal(locale: Locale): Proposal {
  const ui = labels(locale);
  const fr = locale === "fr";
  return {
    locale,
    clientName: "CyberImpact",
    clientUrl: "https://www.cyberimpact.com/en/",
    title: fr ? "Proposition du développement du site web CyberImpact" : "CyberImpact Website Development Proposal",
    metaTitle: fr ? "Proposition CyberImpact | CRFT Studio" : "CyberImpact Proposal | CRFT Studio",
    metaDescription: fr
      ? "Découvrez la pile technologique, la vitesse de page, le plan de site et les balises meta de n'importe quel site web. Obtenez des insights pour améliorer la performance et le SEO de votre site."
      : "Discover the tech stack, pagespeed, sitemap and meta tags of any website you're curious about. Get insights to improve your website's performance and SEO.",
    ogImageUrl: OG_PROPOSAL,
    currentLangLabel: fr ? "FR" : "EN",
    alternate: fr
      ? { href: "/proposal/cyberimpact", label: "EN" }
      : { href: "/proposal/cyberimpact-fr", label: "FR" },
    introHtml: fr
      ? `<p class="text-neutral-400">Nous collaborons avec des équipes marketing et produit ambitieuses pour transformer leur présence numérique en moteurs marketing haute performance. Chez CRFT Studio, chaque projet est conçu pour livrer des résultats commerciaux tangibles ; combinant stratégie, design et développement moderne en un processus fluide de bout en bout. De la découverte et de la stratégie au lancement et à la croissance continue, nous construisons des sites qui sont beaux, ultra-rapides et faciles à gérer - pour que vous puissiez vous concentrer sur la croissance de votre entreprise, pas sur la gestion de votre site web.</p>`
      : `<p class="text-neutral-400">We collaborate with ambitious marketing and product teams to transform their digital presence into high-performance marketing engines. At CRFT Studio, every project is designed to deliver tangible business results; combining strategy, design, and modern development in one seamless, end-to-end process. From discovery and strategy to launch and ongoing growth, we build sites that are beautiful, lightning-fast, and effortless to manage - so you can focus on growing your business, not wrangling your website.</p>`,
    homepage,
    showCmsCompare: false,
    sitemap: {
      heading: ui.sitemap,
      embedSrc: "https://embed.figma.com/board/jVE5gUJkWuiU1WfbAEdEBn/New-Sitemap?node-id=0-1&embed-host=share",
    },
    timeline: timeline(locale),
    costs: costs({
      locale,
      currency: "CAD",
      monthly: 6850,
      quarterly: 6000,
      sixmonth: 5600,
      // Match the current Cyberimpact page, whose script rewrites the price with a leading $.
      priceFormat: "en-prefix",
      devSummaryHtml: fr
        ? "Nous facturons normalement des frais mensuels, trimestriels ou annuels initiaux basés sur la durée d'un projet. Bien que nous estimions que le nouveau site web de Cyberimpact sera lancé dans un délai de trois mois, nous aimons réserver du temps supplémentaire pour affiner le site web en fonction des retours réels des utilisateurs et des observations analytiques, garantissant que le résultat final correspond à vos objectifs commerciaux et offre une excellente expérience utilisateur."
        : "We normally bill an upfront monthly, quarterly or annual fee based on a project's duration. While we estimate Cyberimpact's new website to launch within three months, we like to reserve additional time to refine the website based on real user feedback and analytics observations, ensuring the final result matches your business goals and delivers a great user experience.",
      supportSummaryHtml: supportSummary(locale, "CAD"),
      techIntroHtml: fr
        ? "Les coûts associés à notre pile technologique recommandée sont facturés directement à CyberImpact et ne sont pas inclus dans notre facturation."
        : "The costs associated with our recommended tech stack are billed directly to CyberImpact and are not included in our billing.",
    }),
    faqsHeading: ui.faqs,
    faqs: baseFaqs(locale),
    contactHtml: ui.contact,
    tocTitle: ui.toc,
    toc: tocFor(locale, false),
  };
}
