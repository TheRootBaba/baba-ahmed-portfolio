# Baba Ahmed El Bekay — Portfolio

A premium, responsive Next.js portfolio for network security, cloud infrastructure and automation.

## Stack
- Next.js App Router + React + TypeScript
- Framer Motion for restrained interface motion
- Lucide icons
- Vercel Web Analytics

## Local development
```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build
```bash
npm run lint
npm run build
npm run start
```

## Deployment
Connected to Vercel project `baba-ahmed-portfolio`. Pushes to the production branch deploy to Vercel; pull requests receive preview deployments when enabled.

Vercel Analytics is mounted in `app/layout.tsx` using `<Analytics />`. Enable Web Analytics in the Vercel project dashboard to view traffic.

## Project scope and evidence
- **NetSec Agent:** Nmap host discovery, TCP port scanning, service-version detection, Streamlit interface and AI-assisted explanations. Scan scope is limited to approved private IPv4 subnets of at most 256 addresses.
- **NetOps Sentinel:** GNS3 lab with three FRRouting routers, five switches and five endpoint LANs. Python validates structured inventory, runs read-only reachability checks and records JSON evidence. The documented baseline uses static routing; OSPF and production monitoring are not claimed as implemented.
- Original screenshots and diagrams are retained under `public/assets`.

No fabricated performance metrics or project outcomes are presented.
