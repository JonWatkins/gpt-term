// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "GPT-Term",
  tagline: "ChatGpt in your terminal",
  favicon: "https://placehold.co/32x32/EEE/31343C?text=G",
  url: "https://jonwatkins.github.io/",
  baseUrl: "/gpt-term/",
  organizationName: "JonWatkins",
  projectName: "gpt-term",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/JonWatkins/gpt-term/tree/main/packages/gpt-term-docs/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/JonWatkins/gpt-term/tree/main/packages/gpt-term-docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "GPT-Term",
        logo: {
          alt: "GPT-Term Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/JonWatkins/gpt-term",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/tutorial",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Git Hub Discussions",
                href: "https://github.com/JonWatkins/gpt-term/discussions",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/JonWatkins/gpt-term",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GPT-Term.`,
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: "announcementBar",
        content:
          'If you like GPT-Term, give it a star on <a target="_blank" ' +
          'rel="noopener noreferrer" href="https://github.com/JonWatkins/gpt-term">GitHub</a>!',
        backgroundColor: "#303846",
        textColor: "#e3e3e3",
        isCloseable: false,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
