# Baba Ahmed El Bekay — Portfolio

An evidence-led portfolio for network security, cloud infrastructure and automation.

## Included
- Editorial, responsive portfolio layout with lightweight interaction and image lightbox.
- NetSec Agent: recorded demo linked from the project's README and embedded in its case study.
- NetOps Sentinel: original GNS3 topology, connectivity test capture, router configuration screenshots and endpoint capture.
- Six original evidence files copied into `assets/evidence/` from the public NetOps Sentinel repository.
- No fabricated application screenshots or invented runtime metrics.

## Verified project scope
NetOps Sentinel documents three FRRouting routers, five switches, five endpoint LANs, seven IP networks, read-only reachability checks, JSON evidence and seven reported passing unit tests. The documented baseline uses static routing; OSPF and production monitoring are not claimed as implemented.

NetSec Agent currently documents Nmap host discovery, TCP port scanning, service-version detection, a Streamlit interface and AI-assisted explanations. Scan scope is limited to approved private IPv4 subnets of at most 256 addresses.

## Run locally
Open `index.html` in a browser or serve this directory with any static file server. No build step is required.

## Deployment
Designed for static deployment on Vercel.