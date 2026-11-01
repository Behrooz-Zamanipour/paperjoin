# Paperjoin usage guide

## Open the app

Download and extract the repository ZIP. Open `Paperjoin.html` in your browser.
Bookmark the file or make a desktop shortcut to use it again. If opening it starts
a text editor, right-click the file and choose **Open with → Chrome / Edge / Firefox**.

## Add and arrange documents

1. Click **choose files**, select two or more PDFs, and confirm the selection.
   You can also drop files onto the upload area.
2. Add more PDFs later using the same control.
3. Each row shows its file name, page count, and size.
4. Use the up/down arrows or drag a row to change the order.
5. Click the remove button on a row to leave out that document.
6. **Clear all** removes the current selection from the page. It does not delete
   the originals on your computer.

Every page of the first file comes first, followed by every page of the next file.
Paperjoin does not sort files by their contents or select individual pages.

## Merge and save

1. Enter a name under **Output file name**. The app adds `.pdf` automatically.
2. Click **Merge PDFs** and keep the page open while it works.
3. Click **Download merged PDF** after processing finishes.
4. Open the download and check the page count and order.

The original files remain unchanged. If you reorder, add, or remove input files,
merge again to generate a new result. Changing only the output name updates the
download name without requiring another merge.

## Troubleshooting

| Problem | What to try |
| --- | --- |
| Merge button is disabled | Add at least two readable PDFs and wait for loading to finish. |
| A password-protected file is rejected | Open it in a PDF tool you trust and save an unlocked copy if you have permission. |
| A file cannot be read | Confirm it opens in a PDF reader; damaged PDFs or files renamed to `.pdf` may fail. |
| Browser becomes slow | Try fewer or smaller documents. Close other memory-heavy tabs. |
| Download is missing | Click the download link; check the browser's download list and chosen folder. |
| Work disappeared after refresh | Selections are held in memory. Re-add the originals; previous downloads remain on disk. |
| Source version looks unstyled | Keep `index.html`, `style.css`, `app.js`, and `vendor/` together, or use `Paperjoin.html`. |
| Browser blocks a local-file feature | Use the optional local server described in the README. |

## Privacy

PDF processing happens inside the browser. No server, analytics service, external
font provider, or AI API is needed by the distributed app. Other browser extensions
and the security of your device are outside Paperjoin's control.
