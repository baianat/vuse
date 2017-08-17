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
