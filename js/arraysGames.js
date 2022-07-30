export const dataArray = (type, size) => {
  const typeArray = {
    food: {
      16: function () {
        let array = ['🍕', '🍔', '🍟', '🌭', '🍗', '🌮', '🥟', '🍣'];
        array = array.concat(array);
        return array;
      },
      20: function () {
        let array = ['🍕', '🍔', '🍟', '🌭', '🍗', '🌮', '🥟', '🍣', '🍩', '🍝'];
        array = array.concat(array);
        return array;
      },
      24: function () {
        let array = ['🍕', '🍔', '🍟', '🌭', '🍗', '🌮', '🥟', '🍣', '🍩', '🍝', '🍦', '🥘'];
        array = array.concat(array);
        return array;
      },
    },
    animals: {
      16: function () {
        let array = ['🐶', '🐷', '🐯', '🦒', '🦊', '🦁', '🦝', '🐮'];
        array = array.concat(array);
        return array;
      },
      20: function () {
        let array = ['🐶', '🐷', '🐯', '🦒', '🦊', '🦁', '🦝', '🐮', '🐸', '🐹'];
        array = array.concat(array);
        return array;
      },
      24: function () {
        let array = ['🐶', '🐷', '🐯', '🦒', '🦊', '🦁', '🦝', '🐮', '🐸', '🐹', '🐲', '🐴'];
        array = array.concat(array);
        return array;
      },
    },
    vehicles: {
      16: function () {
        let array = ['🚗', '🚕', '🚌', '🚑', '🚓', '🚒', '🛵', '🚁'];
        array = array.concat(array);
        return array;
      },
      20: function () {
        let array = ['🚗', '🚕', '🚌', '🚑', '🚓', '🚒', '🛵', '🚁', '🚄', '🛹'];
        array = array.concat(array);
        return array;
      },
      24: function () {
        let array = ['🚗', '🚕', '🚌', '🚑', '🚓', '🚒', '🛵', '🚁', '🚄', '🛹', '🚂', '🛸'];
        array = array.concat(array);
        return array;
      },
    },
    others: {
      16: function () {
        let array = ['🐱‍👤', '👻', '👽', '👾', '🤖', '💩', '👹', '🤡'];
        array = array.concat(array);
        return array;
      },
      20: function () {
        let array = ['🐱‍👤', '👻', '👽', '👾', '🤖', '💩', '👹', '🤡', '🐱‍🏍', '🐱‍🚀'];
        array = array.concat(array);
        return array;
      },
      24: function () {
        let array = [
          '🐱‍👤',
          '👻',
          '👽',
          '👾',
          '🤖',
          '💩',
          '👹',
          '🤡',
          '🐱‍🏍',
          '🐱‍🚀',
          '🎃',
          '🚀',
        ];
        array = array.concat(array);
        return array;
      },
    },
  };

  return !typeArray.hasOwnProperty(type)
    ? typeArray['food']['16']()
    : !typeArray[type].hasOwnProperty(size)
    ? typeArray['food']['16']()
    : typeArray[type][size]();
};

['🍕', '🍕', '🍔', '🍔', '🍟', '🍟', '🌭', '🌭', '🍗', '🍗', '🌮', '🌮', '🥟', '🥟', '🍣', '🍣'];

export const sizesArray = [16, 20, 24];
export const typeArray = ['food', 'animals', 'vehicles', 'others'];
