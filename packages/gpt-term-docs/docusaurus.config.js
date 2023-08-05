// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "GPT-Term",
  tagline: "ChatGpt in your terminal",
  favicon: "https://placehold.co/32x32/EEE/31343C?text=G",

  // Set the production url of your site here
  url: "https://jonwatkins.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/gpt-term/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "JonWatkins", // Usually your GitHub org/user name.
  projectName: "gpt-term", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/JonWatkins/gpt-term/tree/main/packages/gpt-term-docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
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
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "GPT-Term",
        // logo: {
        //   alt: "GPT-Term Logo",
        //   src: "https://placehold.co/32x32/EEE/31343C?text=G",
        // },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
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
        copyright: `Copyright © ${new Date().getFullYear()} GPT-Term, Inc. Built with Docusaurus.`,
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
        isCloseable: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
