const fragment = document.createDocumentFragment();

export const drawSelectSize = (element, array = []) => {
  array.forEach((el) => {
    const $opt = document.createElement('option');
    $opt.setAttribute('value', el);
    if (isNaN(el)) {
      el = el[0].toUpperCase() + el.substring(1);
      $opt.textContent = el;
    } else {
      $opt.textContent = el;
    }

    fragment.appendChild($opt);
  });
  element.appendChild(fragment);
};
