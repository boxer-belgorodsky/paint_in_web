// набор функций, свойств, методов и объявление глобальный переменных
import $ from "jquery";
import interact from "interactjs";
import Sortable from "sortablejs";
import "fabric";
import Vuex from "vuex";

window.levelNeg = -10;
window.level0 = 0;
window.level1 = 10;
window.level2 = 100;
window.level3 = 1000;
window.level4 = 10000;

window.html = document.documentElement;
window.$ = $;
window.interact = interact;
window.Sortable = Sortable;
window.fabric = fabric;
window.Vuex = Vuex;
window.genID = generatorID();

Object.defineProperty(fabric.Group.prototype, "object", {
  get() {
    return this.item(0);
  },
  enumerable: false
});

Object.defineProperty(fabric.Group.prototype, "renderGroup", {
  value() {
    this.set({ width: this.object.width, height: this.object.height });
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "last", {
  get() {
    return this[this.length - 1];
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "remove", {
  value(value) {
    this.splice(this.indexOf(value), 1);
    return value;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "removeIndex", {
  value(value) {
    let returnable = this[value];
    this.splice(value, 1);
    return returnable;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "flat", {
  value() {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr = newArr.concat(this[i]);
    }
    return newArr;
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, "unique", {
  value(key) {
    let result = [];

    for (let i = 0; i < this.length; i++) {
      let obj = this[i];

      if (result.find(item => item[key] === obj[key])) continue;

      result.push(obj);
    }
    return result;
  },
  enumerable: false
});

Object.defineProperty(Object.prototype, "genID", {
  get: () => genID.next().value,
  enumerable: false
});

window.reverse = arr => arr.reduceRight((prev, item) => prev.concat(item), []);

// window.reverse = arr => {
//   let newArr = [];
//   for (let i = 0, j = arr.length - 1; i < arr.length; i++, j--) {
//     newArr[i] = arr[j];
//   }
//   return newArr;
// };

export function switcher(f, value1, value2) {
  let flag = true;
  return function() {
    if (flag) {
      f(value1);
      flag = false;
    } else {
      f(value2);
      flag = true;
    }
  };
}

window.elemCenter = function(elem, left = 0, top = 0) {
  elem = $(elem);
  if (left && !top)
    elem.css({
      left,
      top: (elem.offsetParent().height() + top) / 2 - elem.height() / 2
    });
  else if (top && !left)
    elem.css({
      left: (elem.offsetParent().width() + left) / 2 - elem.width() / 2,
      top: top
    });
  else
    elem.css({
      left: (elem.offsetParent().width() + left) / 2 - elem.width() / 2,
      top: (elem.offsetParent().height() + top) / 2 - elem.height() / 2
    });
};

window.maxId = arr => Math.max(...arr.map(item => item.id));

window.float = str => (parseFloat(str) !== Infinity && parseFloat(str) ? parseFloat(str) : 0);

window.round = (num, amount) => Math.round(num * 10 ** amount) / 10 ** amount;

window.find = (arr, connector, prop = "connector", index = false) =>
  index
    ? arr.indexOf(arr.filter(item => item[prop] === connector)[0])
    : arr.filter(item => item[prop] === connector)[0];

window.spreadArray2 = function(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      newArr.push(arr[i][j]);
    }
  }
  return newArr;
};

function* generatorID() {
  for (let i = 1000; i < 10000000; i++) yield i;
}

// window.arr1 = [];
// window.arr2 = [];
// window.arr3 = [];

// for (let i = 0; i < 100000; i++) {
//   if (i < 30000) arr1.push(i);
//   else if (i > 30000 && i < 60000) arr2.push(i);
//   else if (i > 60000) arr3.push(i);
// }

//реализация drag'n'drop
export function drag(target, wrapper, f_down = () => {}, f_move = () => {}, f_up = () => {}) {
  target.ondragstart = () => {
    return false;
  };

  target.onmousedown = e => {
    let x = e.pageX;
    let y = e.pageY;
    let begin_x = get_left(wrapper);
    let begin_y = get_top(wrapper);

    f_down();

    document.onmousemove = e => {
      wrapper.style.left = begin_x + (e.pageX - x) + "px";
      wrapper.style.top = begin_y + (e.pageY - y) + "px";

      f_move();
    };
  };

  document.onmouseup = e => {
    document.onmousemove = null;
  };

  target.onmouseup = e => {
    document.onmousemove = null;

    f_up();
  };
}

export function get_x(e) {
  // (e.pageX - APP.wrapper_zoom.getBoundingClientRect().left) * APP.canvas.zoom;

  return APP.canvas.getPointer(e).x;
}
export function get_y(e) {
  // (e.pageY - APP.wrapper_zoom.getBoundingClientRect().top) * APP.canvas.zoom;
  return APP.canvas.getPointer(e).y;
}

export function get_zoom() {
  APP.canvas.zoom = parseFloat(APP.canvas.getWidth()) / get_width(APP.canvas.wrapperEl);
}

export function active(...value) {
  for (let item of value) {
    item.classList.add("active");
  }
}

export function disactive(...value) {
  for (let item of value) {
    item.classList.remove("active");
  }
}

window.getPropFromInput = function(input_values, ...lists) {
  let obj = {};
  for (let input_value of input_values) {
    for (let list of lists) {
      if (list === input_value.subtitle) {
        Object.assign(obj, { [list]: input_value.enter });
      }
    }
  }
  return obj;
};
