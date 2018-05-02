import APP from "../class_app";
import {
  get_height,
  get_width,
  get_left,
  get_top,
  visible,
  hidden,
  switcher,
  block,
  none,
  drag
} from "../addition_function";
import CREATE_ELEMENT from "../class_create_element";
import CASING from "../class_casing";

export default class TOOLS_COMPONENTS extends APP {
  constructor(wrapper) {
    super();
    this.wrapper = wrapper;
    this.drag_panel;
    this.drag_place;
  }
  create_drag_panel(drag_panel_func) {
    let panel = new CREATE_ELEMENT("div").add_classes("drag-panel");

    let arrow = new CREATE_ELEMENT("div").add_classes("drag-panel-arrow", "drag-panel-item");

    let close = new CREATE_ELEMENT("div").add_classes("drag-panel-close", "drag-panel-item");

    arrow.innerHTML = "<img width=11 height=11 src='img/rewind.png' />";

    close.onclick = () => none(this.wrapper);

    arrow.onclick = e => {
      arrow.classList.toggle("drag-panel-arrow-active");
      drag_panel_func();
    };

    panel.appendChild(arrow);
    panel.appendChild(close);

    this.drag_panel = panel;

    this.wrapper.prepend(panel);

    return this;
  }
  create_drag_place() {
    let place = new CREATE_ELEMENT("div").add_classes("drag-place").add_child('<img src="./img/drag.png" />');

    drag(
      place,
      this.wrapper,
      () => {
        if (this.wrapper.classList.contains("tool-active")) {
          this.wrapper.classList.remove("tool-active");
        }
        CASING.block();
      },
      () => {},
      () => {
        CASING.none();
      }
    );

    this.drag_panel.after(place);

    this.drag_place = place;
  }
  create_menu_bar() {}
  create_footer_bar() {}
}
