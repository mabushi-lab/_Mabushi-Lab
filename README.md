# Mabushi Lab

**Embedded systems. Open source.**

The website for [Mabushi Lab](https://github.com/mabushi-lab), an open-source IoT hardware lab building ESP32-based devices: RF analyzers, motion-sensing units and connected displays. Live at **[iot.braunf.com](https://iot.braunf.com)**.

## Projects showcased

| Project | What it is | Repo |
| --- | --- | --- |
| **CrossWave** | Paired motion-sensing devices. MPU6050 accelerometer, 433 MHz RF, BLE provisioning, OLED UI, WebSocket streaming. | _repo coming soon_ |
| **NetworkSniffer** | 433 MHz OOK/ASK analyzer with RadioHead decoding and a live web dashboard hosted on the ESP32. | [mabushi-lab/NetworkSniffer](https://github.com/mabushi-lab/NetworkSniffer) |
| **Pulsar** | Wall-mounted smart display (LilyGO T-Display-S3) with live market data and a Pomodoro timer. | [mabushi-lab/Pulsar](https://github.com/mabushi-lab/Pulsar) |

## Site structure

A dependency-free static site: plain HTML, CSS and a little vanilla JavaScript. There is no build step.

```
index.html           Landing page: hero, project cards, about
404.html             Not-found page
crosswave.html       CrossWave detail page
networksniffer.html  NetworkSniffer detail page
pulsar.html          Pulsar detail page
style.css            Shared styles
script.js            Nav behavior
og-image.png        Social preview image
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

Hosted on GitHub Pages from the `master` branch root. The `CNAME` file maps the site to its custom domain.

## Adding a project

1. Copy an existing detail page (e.g. `pulsar.html`) and edit its content.
2. Add a matching card to the projects section of `index.html`.
3. Pick an accent color in `style.css` (teal `#10d9a0`, blue `#38bdf8`, amber `#f59e0b` are taken).

## License

[MIT](LICENSE)
