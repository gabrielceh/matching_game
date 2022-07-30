const $fragment = document.createDocumentFragment();

export const drawGrid = (table, num) => {
  table.innerHTML = '';
  const raws = 4;
  const cols = num / 4;
  let index = 0;
  for (let i = 0; i < raws; i++) {
    const $tr = document.createElement('tr');
    $tr.classList.add('game-table-row');
    for (let j = 0; j < cols; j++) {
      const $td = document.createElement('td');
      const $button = document.createElement('button');
      $button.classList.add('btn-game', 'js-btn');
      $button.setAttribute('id', index);
      index++;
      $td.appendChild($button);
      $tr.append($td);
    }
    $fragment.appendChild($tr);
  }
  table.appendChild($fragment);
};
