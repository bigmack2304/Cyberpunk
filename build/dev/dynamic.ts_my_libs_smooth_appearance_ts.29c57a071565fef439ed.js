"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["ts_my_libs_smooth_appearance_ts"],{

/***/ "./ts/my_libs/smooth_appearance.ts":
/*!*****************************************!*\
  !*** ./ts/my_libs/smooth_appearance.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": function() { return /* binding */ main; }
/* harmony export */ });
var observer_options = {
  root: null,
  threshold: 0.4
};
var observer = new IntersectionObserver(intersection_callback, observer_options);
var observe_count = 0;

function main(animate_elements) {
  if (!observer) return;

  for (var _i = 0, animate_elements_1 = animate_elements; _i < animate_elements_1.length; _i++) {
    var data_element = animate_elements_1[_i];
    var DOM_elements = document.querySelectorAll(data_element.selector);

    for (var DOM_element in DOM_elements) {
      if (!DOM_elements.hasOwnProperty(DOM_element)) continue;
      var target_DOM_element = DOM_elements[DOM_element];
      target_DOM_element.setAttribute("data-animate_name", "".concat(data_element.animate));
      target_DOM_element.classList.add("".concat(data_element.animate, "_main"));
      target_DOM_element.classList.add("".concat(data_element.animate, "_out"));
      observer.observe(target_DOM_element);
      observe_count++;
    }
  }
}

function intersection_callback(DOM_elements) {
  for (var _i = 0, DOM_elements_1 = DOM_elements; _i < DOM_elements_1.length; _i++) {
    var DOM_element = DOM_elements_1[_i];
    if (!DOM_element.isIntersecting) continue;
    var animate_name = DOM_element.target.getAttribute("data-animate_name");
    if (!animate_name) continue;
    DOM_element.target.classList.remove("".concat(animate_name, "_out"));
    setTimeout(intersection_out_callback.bind(null, DOM_element.target), 1000);
  }
}

function intersection_out_callback(element) {
  if (!observer) return;
  var animate_name = element.getAttribute("data-animate_name");
  element.classList.remove("".concat(animate_name, "_main"));
  element.removeAttribute("data-animate_name");
  observer.unobserve(element);
  observe_count--;

  if (observe_count == 0) {
    observer.disconnect();
    observer = null;
  }
}



/***/ })

}]);
//# sourceMappingURL=dynamic.ts_my_libs_smooth_appearance_ts.29c57a071565fef439ed.js.map