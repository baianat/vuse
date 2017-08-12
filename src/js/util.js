import elementsProps from './elementsProps';


export function exciteEditable(wrapper) {
  const editableContent = Array.from(wrapper.querySelectorAll('.is-editable'));
  editableContent.forEach((el) => {
    el.contentEditable = 'true';
  })
}

export function getSectionById(elements, id) {
  const getId = (el) => el.id === id;
  const section = elements.find(getId);
  return section;
}

export function removeFromArray(array, value) {
  const index = array.indexOf(value);
  if (index > -1) array.splice(index, 1);
}

export function isParentTo(target, parent) {
  let currentNode = target;
  while (currentNode !== null) {
    if (currentNode === parent) return true;
    currentNode = currentNode.parentNode;
  }
  return false;
}

export function getElementProps(el, id, editable) {
  // deep clone object
  const temp = JSON.parse(JSON.stringify(elementsProps[el]));

  return {
    ...temp,
    id: id,
    name: el,
    editable: editable
  };
}