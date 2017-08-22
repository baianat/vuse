import JSZip from 'jszip';
import saveAs from 'save-as';
import { getImageBlob } from '../util';

function download () {
  const frag = this.outputFragment();
  const editable = Array.from(frag.querySelectorAll('.is-editable'));
  const uploaders = Array.from(frag.querySelectorAll('.is-uploader'));
  const stylers = Array.from(frag.querySelectorAll('.styler'));
  const images = Array.from(frag.querySelectorAll('img'));
  const artboard = frag.querySelector('#artboard');
  const head = frag.querySelector('head');
  const imagePromises = [];
  const zip = new JSZip();
  const output = zip.folder('project');
  const imgFolder = output.folder('assets/img');

  images.forEach((image) => {
    const imageLoader = getImageBlob(image.src);
    imagePromises.push(imageLoader);
    imageLoader.then((img) => {
      imgFolder.file(img.name, img.blob, { base64: true });
      image.setAttribute('src', `assets/img/${img.name}`);
    })
  });

  Promise.all(imagePromises).then(() => {
    editable.forEach((el) => {
      el.contentEditable = 'false';
      el.classList.remove('is-editable');
    });
    uploaders.forEach((el) => {
      const input = el.querySelector(':scope > input');
      input.remove();
      el.classList.remove('is-uploader');
    });
    stylers.forEach((styler) => {
      styler.remove();
    });

    output.file('index.html',
      `<html>
          <head>
            ${head.innerHTML}
          </head>
          <body>
            ${artboard.innerHTML}
          </body>
        </html>`);

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'project.zip');
    });
  });
}

export default function install ({ Builder }) {
  Builder.prototype.download = download;
};
