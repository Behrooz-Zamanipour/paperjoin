const assert = require('node:assert/strict');
const { PDFDocument } = require('../vendor/pdf-lib.min.js');

(async () => {
  const first = await PDFDocument.create();
  first.addPage([111, 222]);
  const second = await PDFDocument.create();
  second.addPage([333, 444]);
  second.addPage([555, 666]);
  const merged = await PDFDocument.create();
  for (const bytes of [await second.save(), await first.save()]) {
    const source = await PDFDocument.load(bytes);
    for (const page of await merged.copyPages(source, source.getPageIndices())) merged.addPage(page);
  }
  const result = await PDFDocument.load(await merged.save());
  assert.deepEqual(result.getPages().map(page => page.getWidth()), [333, 555, 111]);
  console.log('PDF merge preserves page count and chosen document order.');
})().catch(error => { console.error(error); process.exitCode = 1; });
