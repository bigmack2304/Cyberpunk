"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["index"],{

/***/ "./ts/my_libs/animation_slides.ts":
/*!****************************************!*\
  !*** ./ts/my_libs/animation_slides.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animate_slides": function() { return /* binding */ animate_slides; }
/* harmony export */ });
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators */ "./ts/my_libs/decorators.ts");



var error_names = {
  instance_error: "the 'animate_slides' class must not have more than one instance.",
  tag_error: "animate_slides error, all blocks with the 'js-animation_slides' class must have the 'div' tag.",
  slide_index_error: "each 'js-animation_slides__slide' element must have an attribute with the name 'data-index' and a value convertible to number."
};

var animate_slides = function () {
  function animate_slides(targetElement, timeout) {
    if (timeout === void 0) {
      timeout = 3000;
    }

    var _this = this;

    this.on_resize = (0,_decorators__WEBPACK_IMPORTED_MODULE_0__.first_caller_delay_callback)(function () {
      var current_slide = _this.get_current_slide_number(_this.animate_blok);

      _this.upd_container_size(_this.animate_blok, current_slide);
    }, function () {}, 150);
    if (animate_slides.is_created) throw new Error(error_names["instance_error"]);
    this.timer_to_next = timeout;
    this.animate_blok = targetElement;
    animate_slides.is_created = true;
    window.addEventListener("resize", this.on_resize.bind(this));
    this.start_timer();
    this.upd_container_size(targetElement, 1);
  }

  animate_slides.prototype.start_timer = function () {
    setTimeout(this.iterator_slide_blocks.bind(this), this.timer_to_next);
  };

  animate_slides.prototype.verify = function () {
    if (this.animate_blok.tagName !== "DIV") {
      throw new Error(error_names["tag_error"]);
    }
  };

  animate_slides.prototype.verify_slide_data_index = function (dom_element) {
    if (!("index" in dom_element.dataset)) {
      throw new Error(error_names["slide_index_error"]);
    }

    if (isNaN(Number(dom_element.dataset.index))) throw new Error(error_names["slide_index_error"]);
  };

  animate_slides.prototype.iterator_slide_blocks = function () {
    this.verify();
    this.next_slide(this.animate_blok);
  };

  animate_slides.prototype.get_current_slide_number = function (dom_element) {
    var is_data_atribut = ("current_clide" in dom_element.dataset);

    var set_current_clide = function set_current_clide() {
      dom_element.dataset.current_clide = "1";
      return "1";
    };

    var current_clide = is_data_atribut ? dom_element.dataset.current_clide : set_current_clide();
    return Number(current_clide);
  };

  animate_slides.prototype.get_next_number_slide = function (max_slides, current_slide_num) {
    if (current_slide_num + 1 > max_slides) return 1;
    return current_slide_num + 1;
  };

  animate_slides.prototype.upd_container_size = function (dom_element, current_slide) {
    var active_slide = dom_element.querySelector(".js-animation_slides__slide[data-index='".concat(current_slide, "']"));
    if (!active_slide) return;
    if (dom_element.clientHeight === active_slide.clientHeight && dom_element.clientWidth === active_slide.clientWidth) return;
    dom_element.style.height = "".concat(active_slide.clientHeight, "px");
  };

  animate_slides.prototype.next_slide = function (dom_element) {
    var current_slide_num = this.get_current_slide_number(dom_element);
    var all_slides = dom_element.querySelectorAll(".js-animation_slides__slide");
    var max_slides = all_slides.length;
    var next_slide = this.get_next_number_slide(max_slides, current_slide_num).toString();

    for (var slide in all_slides) {
      if (!all_slides.hasOwnProperty(slide)) continue;
      this.verify_slide_data_index(all_slides[slide]);

      if (all_slides[slide].dataset.index == next_slide) {
        all_slides[slide].style.opacity = "1";
      } else {
        all_slides[slide].style.opacity = "0";
      }
    }

    dom_element.dataset.current_clide = next_slide;
    this.start_timer();
  };

  animate_slides.is_created = false;
  return animate_slides;
}();



/***/ }),

/***/ "./ts/my_libs/aria_hidden_upd.ts":
/*!***************************************!*\
  !*** ./ts/my_libs/aria_hidden_upd.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
main();

function main() {
  var DOM_elements = document.querySelectorAll(".js-disabled");

  for (var element_name in DOM_elements) {
    if (!DOM_elements.hasOwnProperty(element_name)) continue;
    DOM_elements[element_name].setAttribute("aria-hidden", "true");
    DOM_elements[element_name].setAttribute("tabindex", "-1");
  }
}



/***/ }),

/***/ "./ts/my_libs/decorators.ts":
/*!**********************************!*\
  !*** ./ts/my_libs/decorators.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caller_delay_callback": function() { return /* binding */ caller_delay_callback; },
/* harmony export */   "first_caller_delay_callback": function() { return /* binding */ first_caller_delay_callback; }
/* harmony export */ });
function first_caller_delay_callback(func, callback, delay) {
  if (callback === void 0) {
    callback = function callback() {};
  }

  if (delay === void 0) {
    delay = 0;
  }

  var call_stack;
  var is_start = false;
  var timer_id = 0;
  return function caller() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    call_stack = {
      argum: args
    };

    var func_call = function func_call() {
      var argum = call_stack.argum;
      func.apply(void 0, argum);
      is_start = false;
      callback();
    };

    if (is_start) {
      clearTimeout(timer_id);
    }

    is_start = true;
    timer_id = setTimeout(func_call, delay);
  };
}

function caller_delay_callback(func, callback, delay) {
  if (callback === void 0) {
    callback = function callback() {};
  }

  if (delay === void 0) {
    delay = 0;
  }

  var call_stack = [];
  var is_start = false;
  return function caller() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    call_stack.push({
      argum: args
    });

    var func_call = function func_call() {
      if (call_stack.length >= 1) {
        var argum = call_stack.shift().argum;
        func.apply(void 0, argum);
        setTimeout(func_call, delay);
      } else {
        is_start = false;
        callback();
      }
    };

    if (!is_start) {
      is_start = true;
      setTimeout(func_call, delay);
    }
  };
}



/***/ }),

/***/ "./ts/my_libs/dev_sticker.ts":
/*!***********************************!*\
  !*** ./ts/my_libs/dev_sticker.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_less_components_dev_mode_sticker_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/less/components/dev_mode_sticker.less */ "./styles/less/components/dev_mode_sticker.less");



document.addEventListener("DOMContentLoaded", onLoad);
var body = document.querySelector("body");

function onLoad(e) {
  var element = document.createElement("div");
  element.classList.add("development_mode_sticker");
  element.innerText = "DEV version";
  body.append(element);
}

/***/ }),

/***/ "./ts/my_libs/lottery_form.ts":
/*!************************************!*\
  !*** ./ts/my_libs/lottery_form.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _safe_querySelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./safe_querySelector */ "./ts/my_libs/safe_querySelector.ts");

var lotery_form = (0,_safe_querySelector__WEBPACK_IMPORTED_MODULE_0__.safeQuerySelector)(document, ".js-letery_form");
var url_to_image = "";
lotery_form.addEventListener("submit", on_submit);
(0,_safe_querySelector__WEBPACK_IMPORTED_MODULE_0__.safeQuerySelector)(lotery_form, ".letery_form__file").addEventListener("change", on_change);

function on_submit(e) {
  e.preventDefault();
  alert("Форма отправлена!");
}

function on_change(e) {
  var _a;

  var filelist = (_a = e.target.files) !== null && _a !== void 0 ? _a : [];

  if (filelist.length > 0) {
    if (url_to_image != "") {
      URL.revokeObjectURL(url_to_image);
    }

    url_to_image = URL.createObjectURL(filelist[0]);
    show_file(url_to_image);
  } else {
    if (url_to_image != "") {
      URL.revokeObjectURL(url_to_image);
      close_file();
    }
  }
}

var file_attach_text = (0,_safe_querySelector__WEBPACK_IMPORTED_MODULE_0__.safeQuerySelector)(lotery_form, ".letery_form__file_attach_text");
var file_previev = (0,_safe_querySelector__WEBPACK_IMPORTED_MODULE_0__.safeQuerySelector)(lotery_form, ".letery_form__file_previev");

function show_file(url) {
  file_attach_text.hidden = true;
  file_previev.hidden = false;
  file_previev.src = url;
}

function close_file() {
  file_attach_text.hidden = false;
  file_previev.hidden = true;
}

/***/ }),

/***/ "./ts/my_libs/media_querys.ts":
/*!************************************!*\
  !*** ./ts/my_libs/media_querys.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is_touch_enabled": function() { return /* binding */ is_touch_enabled; },
/* harmony export */   "media_is_desctop": function() { return /* binding */ media_is_desctop; },
/* harmony export */   "media_is_maxPX": function() { return /* binding */ media_is_maxPX; },
/* harmony export */   "media_is_mobile": function() { return /* binding */ media_is_mobile; },
/* harmony export */   "media_is_tablet": function() { return /* binding */ media_is_tablet; }
/* harmony export */ });
function media_is_desctop() {
  var media_query = window.matchMedia("(min-width: 1025px)");
  return media_query.matches;
}

function media_is_tablet() {
  var media_query = window.matchMedia("(min-width: 321px) and (max-width: 1024px)");
  return media_query.matches;
}

function media_is_mobile() {
  var media_query = window.matchMedia("(min-width: 1px) and (max-width: 320px)");
  return media_query.matches;
}

function media_is_maxPX(valuePX) {
  var media_query = window.matchMedia("(max-width: ".concat(valuePX, "px)"));
  return media_query.matches;
}

function is_touch_enabled() {
  return navigator.maxTouchPoints > 0;
}



/***/ }),

/***/ "./ts/my_libs/safe_querySelector.ts":
/*!******************************************!*\
  !*** ./ts/my_libs/safe_querySelector.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "safeQuerySelector": function() { return /* binding */ safeQuerySelector; },
/* harmony export */   "safeQuerySelectorAll": function() { return /* binding */ safeQuerySelectorAll; }
/* harmony export */ });
function safeQuerySelector(target, selector) {
  var result = target.querySelector(selector);

  if (result == null) {
    throw new Error("'".concat(selector, "' not found"));
  }

  return result;
}

function safeQuerySelectorAll(target, selector) {
  var result = target.querySelectorAll(selector);

  if (result.length === 0) {
    throw new Error("'".concat(selector, "' not found"));
  }

  return result;
}



/***/ }),

/***/ "./ts/pages_scripts/index.ts":
/*!***********************************!*\
  !*** ./ts/pages_scripts/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css_normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../styles/css/normalize.css */ "./styles/css/normalize.css");
/* harmony import */ var _styles_less_page_style_import_index_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../styles/less/page_style_import/index.less */ "./styles/less/page_style_import/index.less");
/* harmony import */ var _my_libs_animation_slides__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../my_libs/animation_slides */ "./ts/my_libs/animation_slides.ts");
/* harmony import */ var _my_libs_safe_querySelector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../my_libs/safe_querySelector */ "./ts/my_libs/safe_querySelector.ts");
/* harmony import */ var _my_libs_lottery_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../my_libs/lottery_form */ "./ts/my_libs/lottery_form.ts");
/* harmony import */ var _my_libs_aria_hidden_upd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../my_libs/aria_hidden_upd */ "./ts/my_libs/aria_hidden_upd.ts");
/* harmony import */ var _my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../my_libs/media_querys */ "./ts/my_libs/media_querys.ts");


var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (g && (g = 0, op[0] && (_ = 0)), _) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};








var slides_block = (0,_my_libs_safe_querySelector__WEBPACK_IMPORTED_MODULE_3__.safeQuerySelector)(document, ".js-animation_slides");
var start_animate_slides = new _my_libs_animation_slides__WEBPACK_IMPORTED_MODULE_2__.animate_slides(slides_block, 5000);
(0,_my_libs_safe_querySelector__WEBPACK_IMPORTED_MODULE_3__.safeQuerySelector)(document, ".all_platforms__button").addEventListener("click", function () {
  var target_to = (0,_my_libs_safe_querySelector__WEBPACK_IMPORTED_MODULE_3__.safeQuerySelector)(document, ".by_game");
  target_to.scrollIntoView({
    behavior: "smooth"
  });
});
(0,_my_libs_safe_querySelector__WEBPACK_IMPORTED_MODULE_3__.safeQuerySelector)(document, ".monitor_block__button").addEventListener("click", function () {
  window.open("https://www.hp.com/kz-ru/products/monitors/product-details/33437315");
});
var animate_elements = [{
  selector: ".cb_description",
  animate: "smooth_appearance_left"
}, {
  selector: ".cb_index_images__image_1",
  animate: "smooth_appearance_left"
}, {
  selector: ".cb_index_images__image_2",
  animate: "smooth_appearance_left"
}, {
  selector: ".cb_index_images__image_3",
  animate: "smooth_appearance_right"
}, {
  selector: ".lotery_block",
  animate: "smooth_appearance_left"
}, {
  selector: ".monitor_block",
  animate: "smooth_appearance_left"
}, {
  selector: ".monitor_block__description",
  animate: "smooth_appearance_right"
}, {
  selector: ".lotery_block__image_priz",
  animate: "smooth_appearance_right"
}, {
  selector: ".by_game__info",
  animate: "smooth_appearance_right"
}];
load_smooth_appearance();

function load_smooth_appearance() {
  return __awaiter(this, void 0, void 0, function () {
    var main;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (((0,_my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__.media_is_mobile)() || (0,_my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__.media_is_tablet)()) && (0,_my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__.is_touch_enabled)()) return [2];
          if ((0,_my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__.media_is_maxPX)(700) && !(0,_my_libs_media_querys__WEBPACK_IMPORTED_MODULE_6__.is_touch_enabled)()) return [2];
          return [4, __webpack_require__.e(/*! import() */ "ts_my_libs_smooth_appearance_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../my_libs/smooth_appearance */ "./ts/my_libs/smooth_appearance.ts"))];

        case 1:
          main = _a.sent().main;
          main(animate_elements);
          return [2];
      }
    });
  });
}

/***/ }),

/***/ "./styles/css/normalize.css":
/*!**********************************!*\
  !*** ./styles/css/normalize.css ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/components/dev_mode_sticker.less":
/*!******************************************************!*\
  !*** ./styles/less/components/dev_mode_sticker.less ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./styles/less/page_style_import/index.less":
/*!**************************************************!*\
  !*** ./styles/less/page_style_import/index.less ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./ts/pages_scripts/index.ts"), __webpack_exec__("./ts/my_libs/dev_sticker.ts"));
/******/ }
]);
//# sourceMappingURL=index.2ed97c51078cd5eade57.js.map