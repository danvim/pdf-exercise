# pdf-exercise

This exercise is paired with a tech talk I gave for Codeaholics in April 2026.

[Slides](./Typesetting%20PDFs%20with%20Web%20Standards.pdf)

This project is an exercise replicating an annual report PDF using HTML and CSS, targeting supported CSS features of [Vivliostyle.js](https://vivliostyle.org/) and Chromium. The goal of this demo is to showcase the extent of capabilities of Vivliostyle on Chromium by tackling commonly faced PDF generation challenges and graphic design/typography challenges.

This repo uses TypeScript and React, but any toolchain that outputs HTML/CSS can feed Vivliostyle the same way.

## Run the demo

```sh
pnpm install
pnpm run start
```

Copy the local URL from your terminal. Open [Vivliostyle Viewer](https://vivliostyle.org/viewer/), paste that URL, and load the document. The viewer runs entirely in your browser; you can also host the viewer library yourself.

Use the browser’s Print dialog (<kbd>Ctrl</kbd>+<kbd>P</kbd> / <kbd>Cmd</kbd>+<kbd>P</kbd>) to save or print to PDF.

## Resources

- [Vivliostyle CLI](https://docs.vivliostyle.org/en/cli/): More akin to a LaTeX project, with the ability to output PDF from a project directory.
