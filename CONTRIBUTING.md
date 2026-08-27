# Contributing

Contributions and forks are welcome.

## Development workflow

1. Fork and clone the repository.
2. Create a branch for your change.
3. Start the local site:

   ```sh
   python3 -m http.server 8848 --directory web
   ```

4. Make the smallest focused change.
5. Validate it before opening a pull request.

## Validation checklist

- Run `node --check web/app.js` and `node --check web/copy.js`.
- Open both `?lang=en` and `?lang=pl`.
- Check the browser console for warnings and errors.
- Exercise the language switch and methodology link.
- Check one desktop and one mobile viewport after visual changes.
- If data changed, verify that the headline count and decade chart still match `web/data/stats.json`.

## Data changes

The published JSON files are committed. To regenerate them, download Global Dam Watch v1.0 as described in the README and run `python3 build/build_dams.py`.

Do not commit downloaded source datasets, local editor settings, generated archives or research notes.
