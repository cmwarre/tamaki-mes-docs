import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import 'dotenv/config'

const config: Config = {
    title: 'Tamaki MES',
    tagline: 'Tamaki MES Module',
    favicon: 'img/favicon.ico',
    themes: ['docusaurus-theme-search-typesense'],

    // Set the production url of your site here
    url: process.env.URL,
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: process.env.BASE_URL,

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'TamakiControl', // Usually your GitHub org/user name.
    projectName: 'tamaki-mes', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: process.env.GITHUB_DOCS_URL,
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
                sitemap: {
                    lastmod: 'date',
                    changefreq: 'weekly',
                    priority: 0.5,
                    ignorePatterns: ['/tags/**'],
                    filename: 'sitemap.xml',
                    createSitemapItems: async (params) => {
                        const {defaultCreateSitemapItems, ...rest} = params;
                        const items = await defaultCreateSitemapItems(rest);
                        return items.filter((item) => !item.url.includes('/page/'));
                    },
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        typesense: {
            typesenseCollectionName: process.env.TYPESENSE_COLLECTION_NAME,
            typesenseServerConfig: {
                nodes: [
                    {
                        host: process.env.TYPESENSE_HOST,
                        port: process.env.TYPESENSE_PORT,
                        protocol: process.env.TYPESENSE_PROTOCOL,
                    },
                ],
                apiKey: process.env.TYPESENSE_API_KEY,
                contextualSearch: true,
                // typesenseSearchParameters: {
                //     query_by: "text",
                // },
            },
        },

        // Replace with your project's social card
        image: 'img/docusaurus-social-card.jpg',
        navbar: {
            title: 'Tamaki MES',
            logo: {
                alt: 'Tamaki MES Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: process.env.GITHUB_CODE_URL,
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'User Manual',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: process.env.STACK_OVERFLOW_URL,
                        }
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'GitHub',
                            href: process.env.GITHUB_CODE_URL,
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Tamaki MES`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;