# Maintaining the map

Use the [preview instructions](README.md#preview-and-maintain) to serve the site locally. The published data is checked in. Rebuild it only when the underlying records or calculations change.

## Rebuild the data

1. Download `GDW_v1_0_shp.zip` from the [Global Dam Watch v1.0 release](https://doi.org/10.6084/m9.figshare.25988293.v1). This archive includes the comma-delimited barrier table.
2. Extract `GDW_barriers_v1_0.txt` into `build/`.
3. From the repository root, run `python3 build/build_dams.py`. It writes `web/data/dams.json` and `web/data/stats.json`. Commit the outputs together. Keep the downloaded source file outside version control.

The headline counts European records with a known year, a recorded capacity of at least 10 million m³ and an age of at least 50 in 2026. The reference release contains 4,321 records, 1,514 with a known construction year and 884 meeting all three criteria. Country cards quote ICOLD figures from the report. Review those separately when updating editorial figures.

## Check a change before publication

- Run `node --check web/app.js` and `node --check web/copy.js` after editing JavaScript.
- Open the local or staging URL with both `?lang=en` and `?lang=pl`. Check the headline and decade chart against `web/data/stats.json`, scroll to the country cards and follow the report and methodology links.
- Open `?embed=1&lang=pl` at desktop and mobile widths. Change the map colours, select a dam and follow the full-story link back to the same host. Check the browser console for loading errors.
- After a data change, reconcile the counts in both versions of the methodology and README before publishing.
