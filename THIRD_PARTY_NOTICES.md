# Third-party notices

Paperjoin vendors the unmodified browser distribution of **pdf-lib 1.17.1**.
Its SHA-256 was checked against the author-published package distribution.

- Source: https://github.com/Hopding/pdf-lib/tree/v1.17.1
- Package: https://www.npmjs.com/package/pdf-lib/v/1.17.1
- Copyright (c) 2019 Andrew Dillon; MIT License.
- Full notice: [pdf-lib license](vendor/licenses/pdf-lib-LICENSE.txt).

The bundled distribution includes components from its dependency tree:

| Component | Version reference | Notice |
| --- | --- | --- |
| @pdf-lib/standard-fonts | 1.0.0 | [License](vendor/licenses/standard-fonts-LICENSE.txt) |
| @pdf-lib/upng | 1.0.1 | [License](vendor/licenses/upng-LICENSE.txt) |
| pako | 1.0.11 | [License](vendor/licenses/pako-LICENSE.txt) |
| tslib | 1.11.1 | [License](vendor/licenses/tslib-LICENSE.txt) |

Existing inline copyright/license comments in the vendored distribution are retained.
These notices also apply to the PDF engine embedded in `Paperjoin.html`.
No remote fonts, framework, analytics package, or PDF service is required.
