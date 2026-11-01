# Paperjoin

**Combine several PDF files into one, privately in your browser.**

Paperjoin is a small, offline-capable PDF merger. Add PDFs, arrange their order,
choose an output name, and download one combined document. No account, backend,
installation, or API key is needed.

[راهنمای فارسی](README.fa.md) · [Usage and troubleshooting](docs/USAGE.md) · [Contributing](CONTRIBUTING.md)

## Start in under a minute

1. On this repository, choose **Code → Download ZIP**.
2. Extract the ZIP. Do not run it from inside the ZIP viewer.
3. Double-click **Paperjoin.html**, or open it with a current Chrome, Edge, or Firefox.
4. Add at least two PDFs. Reorder them with the arrows or by dragging.
5. Enter the output file name and click **Merge PDFs**.
6. Click **Download merged PDF**. Find the result in your browser's download folder.

Keep `Paperjoin.html` anywhere convenient and open it again whenever you need it.
It includes the PDF library, styling, and application code, so it works offline.

## Features

- Choose multiple PDFs or drag and drop them.
- See page counts and file sizes before merging.
- Reorder files, remove a file, or clear the list.
- Choose the merged PDF's name.
- Download all pages in the chosen file order.
- Use a standalone HTML file or the readable HTML/CSS/JavaScript source.
- Work entirely on your own device, with no PDF uploads or tracking services.

## Requirements

A modern desktop browser and enough available memory for the input PDFs and result.
There is no hard-coded file-count or file-size limit. Very large documents can
exhaust browser memory. No Python or Node.js is required for normal use.

## Other ways to run it

**Readable source:** open `index.html` while keeping `app.js`, `style.css`, and
`vendor/` in the same folder. These files also work offline.

**Optional local server for development:** with Python installed, run this from
the repository folder:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8080>. Press Ctrl+C in the terminal to stop the server.

**Optional GitHub Pages:** in your repository's **Settings → Pages**, choose
**Deploy from a branch**, select **main** and **/(root)**, and save. GitHub serves
`index.html`. Opening a hosted page downloads the application; merging PDFs still
happens locally. Hosting providers receive ordinary page requests, not PDF contents.

## What happens to my PDFs?

The selected files are read into the browser's memory. Paperjoin does not send
them to a server or save them in this repository. Originals are unchanged.
Refreshing or closing the page clears the current selection. Download the merged
file before leaving. The public distribution contains no external font requests.

## Limitations

- Unlock password-protected PDFs before adding them.
- Damaged or unsupported PDFs may fail to load.
- All pages are merged; choosing page ranges is not implemented.
- Interactive forms, bookmarks, attachments, accessibility tags, and digital
  signatures may not survive merging. Review the downloaded result.
- Paperjoin does not perform OCR, compression, editing, or password removal.
- A completed merge is downloaded only when you click the download link.

See the [full usage guide](docs/USAGE.md) for troubleshooting.

## Development

Edit `index.html`, `style.css`, and `app.js`. The PDF engine is vendored under
`vendor/` so normal use needs no network connection.

After changing the source, rebuild the single-file version with Python 3:

```sh
python scripts/build_offline.py
```

Check both `index.html` and `Paperjoin.html`: add two sample PDFs, reorder them,
merge, and confirm the downloaded page order. A dependency smoke check is also
available for developers with Node.js:

```sh
node tests/pdf_merge.cjs
```

## License and credits

Paperjoin application code is available under the [MIT License](LICENSE).
The bundled [pdf-lib 1.17.1](https://github.com/Hopding/pdf-lib/tree/v1.17.1)
uses its own MIT license; see [third-party notices](THIRD_PARTY_NOTICES.md).
