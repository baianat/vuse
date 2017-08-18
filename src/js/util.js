export function getSectionById (elements, id) {
  const getId = (el) => el.id === id;
  const section = elements.find(getId);
  return section;
}

export function removeFromArray (array, value) {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
}

export function isParentTo (target, parent) {
  let currentNode = target;
  while (currentNode !== null) {
    if (currentNode === parent) return true;
    currentNode = currentNode.parentNode;
  }
  return false;
}

export function getImageBlob (URL) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
    xhr.responseType = 'blob';

    xhr.onload = function () {
      const imageBlob = this.response;
      const fileType = this.response.type.split('/')[1].split('+')[0];
      const randomNumber = new Date().getUTCMilliseconds();
      const filename = `image-${randomNumber}.${fileType}`;
      resolve({ blob: imageBlob, name: filename });
    }
    xhr.send(null);
  });
}

export function getTypeFromTagName (tagName) {
  tagName = tagName.toUpperCase();
  switch (tagName) {
    case 'H1':
      return 'text';
    case 'H2':
      return 'text';
    case 'H3':
      return 'text';
    case 'H4':
      return 'text';
    case 'H5':
      return 'text';
    case 'H6':
      return 'text';
    case 'P':
      return 'text';
    case 'B':
      return 'text';
    case 'SPAN':
      return 'text';
    case 'BUTTON':
      return 'button';
    case 'A':
      return 'button';
    case 'SECTION':
      return 'section';
    case 'HEADER':
      return 'section';
    default:
      break;
  }
}
