# Connect Nepal Voices

# MPConnectNepal — Lovable.ai Build Prompt




Copy everything below into Lovable.ai as your project prompt.




---




Build a clean, trustworthy, mobile-first website for a nonprofit civic initiative called **MPConnectNepal**.




## What MPConnectNepal does

MPConnectNepal bridges the gap between Nepali citizens and their elected Members of Parliament (MPs). MPs are often based in Kathmandu and rarely get to hear directly from constituents. Citizens who have questions, local problems, or policy ideas often don't get a chance to be heard. MPConnectNepal collects requests from citizens, screens and organizes them by constituency, and personally arranges video calls between constituents and their MP — or relays their ideas on their behalf when a live call isn't possible.




## Tone & Design

- Civic, credible, non-partisan — should feel like a public trust institution, not a startup or a political campaign.

- Clean, calm color palette (avoid a single political party's colors — Nepali party colors are strongly associated, so lean toward neutral blues, whites, and a subtle Nepali flag-inspired accent used tastefully, not literally).

- Simple typography, generous white space, accessible on low-end phones and slow connections (many users will be on mobile data in rural areas).

- Include both English and Nepali language toggle if feasible (or at least Nepali-friendly font support/Devanagari compatibility).




## Pages / Sections




### 1. Home Page

- Hero section: clear one-line explanation of what MPConnectNepal does ("Your voice, delivered to your representative.")

- Short explainer: 3-step visual (1. Submit your request → 2. We connect you with others in your constituency → 3. We arrange a call with your MP)

- Prominent, single call-to-action button: **"Request a Call with Your MP"** — this links out to a Google Form (I will provide the embed/link separately; use a placeholder link `#google-form-link` for now).

- Trust-building section: "Why MPConnectNepal exists" — explain the gap (MPs want public input but can't filter who to talk to; engaged citizens rarely get access) in plain language.

- Nonprofit/independence disclaimer: clearly state MPConnectNepal is an independent, non-partisan civic nonprofit, not affiliated with any political party or the Government of Nepal.




### 2. How It Works (detailed)

- Step-by-step breakdown of the full process:

1. Citizen fills out the request form (name, contact info, constituency, reason for the call/topic).

2. MPConnectNepal reviews submissions and groups people by constituency.

3. Once enough interest is gathered from a constituency, MPConnectNepal contacts the MP's office to request time.

4. A shared video call (Google Meet) is scheduled with the MP, the citizen(s), and an MPConnectNepal representative present.

5. If a citizen can't join live, MPConnectNepal presents their question/idea to the MP on their behalf.

- Include an FAQ accordion addressing: "Is this free?", "Will my MP definitely respond?", "How long does it take?", "Is my information kept private?", "Who is behind MPConnectNepal?"




### 3. About / Our Mission

- Founding story section (placeholder text I'll customize): why this was started, the gap it fills, vision for nationwide rollout across all constituencies of Nepal.

- "Meet the Team" section with placeholder for President/Founder bio and photo.

- Non-partisan commitment statement.




### 4. For Representatives (MPs) Page

- A short page specifically addressing MPs/their staff: explains how MPConnectNepal filters and pre-screens constituent requests so their time is used efficiently, and that MPConnectNepal handles logistics (grouping requests, scheduling, relaying ideas when constituents can't attend).

- Include a simple "Partner With Us" contact form or mailto link for MP offices to reach out directly.




### 5. Get Involved / Volunteer

- Simple page for volunteers who want to help review submissions, coordinate outreach, or expand MPConnectNepal to more constituencies.

- Simple signup form (name, email, constituency, how they want to help).




### 6. Contact / Footer

- Contact email, social links (placeholders), and footer disclaimer that MPConnectNepal is a registered nonprofit (placeholder for registration number once available).

- Footer should repeat the non-partisan, independent nonprofit disclaimer.




## Functional requirements

- The main citizen-facing CTA ("Request a Call with Your MP") should link/embed to an external Google Form — use a clearly marked placeholder URL that I can swap in later.

- Include a simple, clean navigation bar: Home | How It Works | About | For Representatives | Get Involved | Contact.

- Fully responsive design, optimized for mobile (majority of Nepali users will access via phone).

- Fast-loading, minimal dependencies — assume users may be on 3G/4G in rural districts.

- Include an easily identifiable "Nonprofit / Non-partisan" badge or banner near the top of the homepage, since trust and neutrality are critical for this kind of platform.




## Content notes

- Do not fabricate specific MP names, party affiliations, statistics, or endorsements — use neutral placeholder language everywhere ("your representative," "your constituency").

- Do not use Nepal Government emblems, official seals, or any element that could imply government affiliation.

- Keep all copy simple, respectful, and accessible to readers with varying literacy levels — avoid jargon.




---




## Notes for you (not part of the Lovable prompt)

A few things worth deciding before or shortly after the site goes live:

- **Legal structure**: You'll want to register MPConnectNepal as a nonprofit (NGO) with Nepal's District Administration Office / Social Welfare Council before actively soliciting citizen PII (name, phone, address) at scale — collecting personal data from the public carries real responsibility.

- **Data privacy**: Since the Google Form will collect name, phone, address, and constituency, add a short privacy note on the form and site explaining how the data is used, stored, and for how long.

- **Scale plan**: Right now the process depends entirely on you personally reviewing every submission and emailing every MP. Before "implementing throughout the country," think about how you'll recruit constituency-level volunteers to replicate your role — otherwise the single-founder bottleneck will cap how many constituencies you can realistically serve.

- **MP buy-in**: Consider reaching out to 2-3 sympathetic MPs first as pilot partners before a national launch — a couple of real success stories will make cold outreach to other MP offices much easier.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bridge-connect-voice.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e41d742a-554f-417b-ab27-2eb91bac0854).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
