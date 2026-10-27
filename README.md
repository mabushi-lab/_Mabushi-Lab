# Mabushi Lab

**Research first. Hardware alongside.**

The website for [Mabushi Lab](https://github.com/mabushi-lab), where Florian Braun publishes independent research in cross-lingual NLP and LLM interpretability, next to open-source ESP32 hardware. Live at **[research.braunf.com](https://research.braunf.com)**.

## What is on the site

The homepage is centred on the research, with the engineering work in a column beside it.

| Section | Content |
| --- | --- |
| **Research** (main column) | What the work is about, six research interests, three papers with key contributions and full abstracts, and the research toolkit |
| **Engineering** (side column) | Three open-source ESP32 projects, each with its own detail page |
| **About** | How the two sides fit together, and both stacks |

### Papers

| Paper | Year | Links |
| --- | --- | --- |
| Excess Separability: Nuisance-Controlled Residual-Stream Probing for Benchmark Contamination Detection | Aug 2026 | [arXiv](https://arxiv.org/abs/2608.12652), [Zenodo](https://doi.org/10.5281/zenodo.21855509), [code](https://github.com/mabushi-lab/residual-stream-contamination-probing) |
| Interpretable Cross-Lingual Alignment in Small Language Models | Apr 2026 | [ResearchGate](https://doi.org/10.13140/RG.2.2.22007.18088) |
| The Foundational Role of Data Structures and Algorithms in AI Systems | Oct 2025 | [ResearchGate](https://doi.org/10.13140/RG.2.2.13838.42566) |

### Engineering projects

| Project | What it is | Repo |
| --- | --- | --- |
| **CrossWave** | Paired motion-sensing devices. MPU6050 accelerometer, 433 MHz RF, BLE provisioning, OLED UI, WebSocket streaming. | _repo coming soon_ |
| **NetworkSniffer** | 433 MHz OOK/ASK analyzer with RadioHead decoding and a live web dashboard hosted on the ESP32. | [mabushi-lab/NetworkSniffer](https://github.com/mabushi-lab/NetworkSniffer) |
| **Pulsar** | Wall-mounted smart display (LilyGO T-Display-S3) with live market data and a Pomodoro timer. | [mabushi-lab/Pulsar](https://github.com/mabushi-lab/Pulsar) |

## Site structure

A dependency-free static site: plain HTML, CSS and a little vanilla JavaScript. There is no build step.

```
index.html           Research-first homepage: hero, research, papers, engineering column, about
404.html             Not-found page
crosswave.html       CrossWave detail page
networksniffer.html  NetworkSniffer detail page
pulsar.html          Pulsar detail page
style.css            Shared styles
script.js            Nav behaviour and scroll reveals
og-image.png         Social preview image
robots.txt, sitemap.xml  SEO
CNAME                Custom domain for GitHub Pages
```

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Deployment

Hosted on GitHub Pages from the `master` branch root. The `CNAME` file maps the site to **research.braunf.com**, so the DNS zone needs a `CNAME` record for `research` pointing at `mabushi-lab.github.io`. The site was previously served at `iot.braunf.com`.

## Adding a paper

Copy an `<article class="rs-paper">` block in `index.html`, edit its year, title, contributions, abstract, tags and links, and update the paper count in the stats strip.

## Adding an engineering project

1. Copy an existing detail page (for example `pulsar.html`) and edit its content.
2. Add a matching `eng-card` to the engineering column of `index.html`.
3. Pick an accent colour in `style.css` (teal `#10d9a0`, blue `#38bdf8` and amber `#f59e0b` are taken).

## License

[MIT](LICENSE)
