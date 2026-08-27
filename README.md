# Past the Expiration Date — interactive map

A bilingual, public-facing scrollytelling map about ageing large dams in Europe. The site is static: MapLibre GL renders the map, Scrollama drives the narrative, and all published data is stored as JSON in the repository.

## Features

- English and Polish content with deep links through `?lang=en` and `?lang=pl`
- interactive MapLibre map with age, decade and capacity views
- animated headline counter and decade chart
- country stories for Poland, Italy, Bulgaria and Romania
- responsive layouts for desktop and mobile
- standalone methodology and sources page
- GitHub Pages deployment workflow

## Run locally

Python 3 is the only local requirement. From the repository root:

```sh
python3 -m http.server 8848 --directory web
```

Open [http://localhost:8848/](http://localhost:8848/). Do not open `web/index.html` through a `file://` URL because browsers block the JSON requests used by the map.

On macOS, `preview.command` provides the same local preview and opens it in Google Chrome.

## Project structure

```text
.github/workflows/pages.yml  GitHub Pages deployment
build/build_dams.py          optional data rebuild script
web/index.html               main scrollytelling page and styles
web/app.js                   map, interaction and rendering logic
web/copy.js                  English and Polish editorial content
web/methodology.html         public methodology and sources
web/data/dams.json           published map records
web/data/stats.json          published aggregate statistics
```

The generated JSON files are committed, so contributors do not need the original source dataset to run or edit the site.

## Rebuild the map data

1. Download Global Dam Watch v1.0 from [Figshare](https://figshare.com/articles/dataset/Global_Dam_Watch_database_version_1_0/25988293).
2. Place the extracted barrier table at `build/GDW_barriers_v1_0.txt`.
3. Run:

```sh
python3 build/build_dams.py
```

The script regenerates `web/data/dams.json` and `web/data/stats.json`. The downloaded source file is intentionally ignored by Git.

## Customize a fork

- Edit editorial content in `web/copy.js`.
- Update the briefing link in `BRIEF_URL` at the top of `web/app.js`.
- Adjust colors and layout tokens in `web/index.html`.
- Replace the published JSON files or rebuild them from Global Dam Watch.
- Enable GitHub Pages with GitHub Actions as the deployment source.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the validation checklist.

## Data and attribution

The map uses Global Dam Watch v1.0 and a CARTO basemap with OpenStreetMap data. Additional figures are attributed on the methodology page. Source datasets and map providers retain their own terms; this repository does not relicense third-party data.

## License

The original software in this repository is available under the [MIT License](LICENSE). Third-party datasets, basemap content, editorial material and trademarks are excluded from that grant and remain subject to their respective source terms.
