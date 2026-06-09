/** External destinations (forms, donations, socials). Centralized so a link
 *  only ever needs updating in one place. */
export const LINKS = {
  apply: "https://tally.so/r/31oNb1",
  applicationPlaybook:
    "https://curse-earth-438.notion.site/application-playbook-37958f457ae38088b94ed84aa7a7299a",
  donate: {
    "50": "https://wise.com/pay/r/DxpArt5HupzB1aU",
    "250": "https://wise.com/pay/r/rEg2_QIc9XRLKtM",
    "1000": "https://wise.com/pay/r/0flNdEJ3NRpth7M",
  } as Record<string, string>,
  launchFilm: "https://www.youtube.com/watch?v=-2ynLKBLzEM",
  slack:
    "https://join.slack.com/t/thearchiveworld/shared_invite/zt-3mq02r3jq-_ulwb6UrAQhYd5xzQzyvxA",
  instagram: "https://www.instagram.com/thearchivefund/",
  linkedin: "https://www.linkedin.com/company/thearchivefund/",
  twitter: "https://x.com/thearchivefund",
} as const;

/** Spread onto an <a>/Btn for external links so they open safely in a new tab. */
export const EXT = { target: "_blank", rel: "noopener noreferrer" } as const;
