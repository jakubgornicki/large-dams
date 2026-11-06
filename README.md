# Past the Expiration Date

An interactive companion to ClientEarth’s report on ageing dams in Europe. Readers can explore 4,321 mapped dams, see which have reached the 50-year alert age and follow the findings for Poland, Italy, Bulgaria and Romania. The story, map controls and methodology are available in English and Polish. Ages are measured against the report year, 2026.

[Explore the map in English](https://jakubgornicki.github.io/large-dams/?lang=en) · [Otwórz mapę po polsku](https://jakubgornicki.github.io/large-dams/?lang=pl) · [Read the ClientEarth report](https://www.clientearth.org/latest/documents/past-the-expiration-date-how-europe-extends-the-life-of-ageing-dams-without-environmental-assessments/)

## Download and publish

1. [Download the repository as a ZIP](https://github.com/jakubgornicki/large-dams/archive/refs/heads/main.zip) and extract it. The `web/` folder contains the complete site, including the published dam records.
2. Copy the **contents of `web/`** to a directory on your HTTPS host, keeping `data/` beside `index.html`. For example, if you upload to `/maps/ageing-dams/`, the map opens at that path. You can also point a static host’s publish directory at `web` and leave its build command empty.
3. Open the published directory with `?lang=en` and `?lang=pl`. In each version, check that the headline reaches **884**, the map shows dam locations and the final panel opens the report and methodology. For the map alone, open `?embed=1&lang=en`.

The server only needs to serve static files. Visitors’ browsers fetch MapLibre GL JS and Scrollama from UNPKG, and the dark basemap, tiles and labels from CARTO. Allow these resources under the host’s content security policy. Dam records and both language versions are served from your own site.

**GitHub Pages.** To publish from your organisation’s account, fork the repository and enable GitHub Actions in the fork. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. In **Actions → Deploy to GitHub Pages**, choose **Run workflow** on `main`. The deployment job gives you the site address. Later pushes to `main` publish updates automatically. [GitHub Pages configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Embed in a ClientEarth article

After publishing the files, paste this iframe into the article’s HTML block. Replace the example address with the **published map directory**, including its trailing slash. If the article and map use different domains, the article must allow the map in an iframe and the map host must allow framing by the article’s domain.

```html
<iframe
  src="https://example.org/maps/ageing-dams/?embed=1&amp;lang=en"
  title="Interactive map of ageing dams in Europe"
  width="100%"
  height="600"
  style="display:block; width:100%; height:600px; border:0;"
  loading="lazy"
></iframe>
```

For a Polish article, set `lang=pl` and use the title “Interaktywna mapa starzejących się zapór w Europie”. The map-only view includes zoom controls, dam details and a link to the full story on your host. Mouse-wheel scrolling stays with the article. To embed the full scrolling story, omit `embed=1`.

## Preview and maintain

From the extracted repository directory, run the following command and open [the local preview](http://localhost:8848/). On Windows with the Python launcher, replace `python3` with `py -3`. Stop the server with Ctrl+C.

```sh
python3 -m http.server 8848 --bind 127.0.0.1 --directory web
```

| To change | Edit |
| --- | --- |
| English and Polish text, country cards or impact figures | `web/copy.js` |
| Report URL, basemap or map interactions | `web/app.js` |
| Story layout, styles or library versions | `web/index.html` |
| Sources and methodology in either language | `web/methodology.html` |
| Dam records and calculated totals | Follow the [data rebuild and validation instructions](CONTRIBUTING.md) |

## Credits and reuse

The original map software is distributed under the [MIT licence](LICENSE). The report, editorial text and ClientEarth marks retain their respective rights.

The dam locations and aggregate counts are adapted from Lehner et al. (2024), *Global Dam Watch database version 1.0*. The map selects European records, rounds coordinates and derives ages and summary statistics. Retain the data credit and licence link when republishing. [Source dataset](https://doi.org/10.6084/m9.figshare.25988293.v1) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

The basemap uses CARTO and OpenStreetMap contributors’ data. Keep the map credits visible in standalone and embedded views. Publishers reusing the project should check that their use is covered by CARTO’s terms. [CARTO basemap terms](https://docs.carto.com/faqs/carto-basemaps) · [OpenStreetMap attribution](https://www.openstreetmap.org/copyright)
