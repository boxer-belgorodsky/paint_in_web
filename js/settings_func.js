Object.prototype.set_left = function(size) {
  this.style.left = size + "px";
};
Object.prototype.set_top = function(size) {
  this.style.top = size + "px";
};

function get_width(elem) {
  let width;
  try {
    if ((parseFloat(elem.style.width) || 0) > elem.clientWidth) {
      width = parseFloat(elem.style.width) || 0;
    } else {
      width = elem.clientWidth;
    }
  } catch (e) {}
  return width;
}

function get_height(elem) {
  let height;
  try {
    if ((parseFloat(elem.style.height) || 0) > elem.clientHeight) {
      height = parseFloat(elem.style.height) || 0;
    } else {
      height = elem.clientHeight;
    }
  } catch (e) {}
  return height;
}

export { get_height, get_width };
