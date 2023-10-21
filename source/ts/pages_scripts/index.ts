"use strict";

/*
    styles
*/

import "../../styles/css/normalize.css";
import "../../styles/less/page_style_import/index.less"; // основной фаил со стилями.

/*
    scripts
*/

import { animate_slides } from "../my_libs/animation_slides";
import { safeQuerySelector } from "../my_libs/safe_querySelector";
import "../my_libs/lottery_form";
import "../my_libs/aria_hidden_upd";
import { media_is_mobile, is_touch_enabled, media_is_tablet } from "../my_libs/media_querys";

let slides_block = safeQuerySelector<HTMLDivElement>(document, ".js-animation_slides");

// подключаем аниматор для слайдов.
const start_animate_slides = new animate_slides(slides_block, 5000);

// интиерактив для кнопки all_platforms__button
safeQuerySelector(document, ".all_platforms__button").addEventListener("click", () => {
    let target_to = safeQuerySelector(document, ".by_game");
    target_to.scrollIntoView({ behavior: "smooth" });
});

// интиерактив для кнопки monitor_block__button
safeQuerySelector(document, ".monitor_block__button").addEventListener("click", () => {
    window.open("https://www.hp.com/kz-ru/products/monitors/product-details/33437315");
});

// загружаем модуль для плавного появления элементов при скролле
// тут перечисляем селекторы элементов для которых нужно плавное появление при скролле
const animate_elements = [
    { selector: ".cb_description", animate: "smooth_appearance_left" },
    { selector: ".cb_index_images__image_1", animate: "smooth_appearance_left" },
    { selector: ".cb_index_images__image_2", animate: "smooth_appearance_left" },
    { selector: ".cb_index_images__image_3", animate: "smooth_appearance_right" },
    { selector: ".lotery_block", animate: "smooth_appearance_left" },
    { selector: ".monitor_block", animate: "smooth_appearance_left" },
    { selector: ".monitor_block__description", animate: "smooth_appearance_right" },
    { selector: ".lotery_block__image_priz", animate: "smooth_appearance_right" },
    { selector: ".by_game__info", animate: "smooth_appearance_right" },
];

load_smooth_appearance();

async function load_smooth_appearance() {
    debugger;
    if ((media_is_mobile() || media_is_tablet()) && is_touch_enabled()) return; // на мобильном устройстве такой функционал не нужен

    let { main } = await import("../my_libs/smooth_appearance");
    main(animate_elements);
}
