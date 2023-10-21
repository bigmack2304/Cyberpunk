"use strict";
import { first_caller_delay_callback, caller_delay_callback } from "./decorators";

// класс подхватывает все блоки "js-animation_slides" и по таймеру листайет слайды.

const error_names = {
    instance_error: "the 'animate_slides' class must not have more than one instance.",
    tag_error: "animate_slides error, all blocks with the 'js-animation_slides' class must have the 'div' tag.",
    slide_index_error:
        "each 'js-animation_slides__slide' element must have an attribute with the name 'data-index' and a value convertible to number.",
};

class animate_slides {
    private static is_created: boolean = false;

    private timer_to_next: number;
    private animate_blok: HTMLDivElement; // живая коллекция всех блоков js-animation_slides

    constructor(targetElement: HTMLDivElement, timeout: number = 3000) {
        if (animate_slides.is_created) throw new Error(error_names["instance_error"]);

        this.timer_to_next = timeout;
        this.animate_blok = targetElement;
        animate_slides.is_created = true;

        window.addEventListener("resize", this.on_resize.bind(this));

        this.start_timer();
        this.upd_container_size(targetElement, 1);
    }

    // private on_resize() {
    //     let current_slide = this.get_current_slide_number(this.animate_blok);
    //     this.upd_container_size(this.animate_blok, current_slide);
    // }

    private on_resize = first_caller_delay_callback(
        () => {
            let current_slide = this.get_current_slide_number(this.animate_blok);
            this.upd_container_size(this.animate_blok, current_slide);
        },
        () => {},
        150
    );

    // запускаем таймер на изменение слайда
    private start_timer() {
        setTimeout(this.iterator_slide_blocks.bind(this), this.timer_to_next);
    }

    // проверяем что js-js-animation_slides это div, иначе бросаем исключение
    private verify() {
        if (this.animate_blok.tagName !== "DIV") {
            throw new Error(error_names["tag_error"]);
        }
    }

    // проверяем что js-animation_slides__slide содержит data-index и он конвертируется в число, иначе бросаем исключение
    private verify_slide_data_index(dom_element: HTMLImageElement) {
        if (!("index" in dom_element.dataset)) {
            throw new Error(error_names["slide_index_error"]);
        }
        if (isNaN(Number(dom_element.dataset.index))) throw new Error(error_names["slide_index_error"]);
    }

    // перебираем все найденные списки слайдов
    private iterator_slide_blocks() {
        this.verify();
        this.next_slide(this.animate_blok);
    }

    // определяем номер текущего слайда в блоке
    private get_current_slide_number(dom_element: HTMLDivElement): number {
        const is_data_atribut = "current_clide" in dom_element.dataset;

        const set_current_clide = () => {
            dom_element.dataset.current_clide = "1";
            return "1";
        };

        let current_clide = is_data_atribut ? dom_element.dataset.current_clide! : set_current_clide();

        return Number(current_clide);
    }

    // определяем номер следующего слайда в блоке
    private get_next_number_slide(max_slides: number, current_slide_num: number): number {
        if (current_slide_num + 1 > max_slides) return 1;

        return current_slide_num + 1;
    }

    // синхронизирует размер  контейнера с размером слайда
    private upd_container_size(dom_element: HTMLDivElement, current_slide: number) {
        let active_slide = dom_element.querySelector(`.js-animation_slides__slide[data-index='${current_slide}']`);

        if (!active_slide) return;

        if (dom_element.clientHeight === active_slide.clientHeight && dom_element.clientWidth === active_slide.clientWidth) return;
        dom_element.style.height = `${active_slide.clientHeight}px`;
    }

    // листает слайд внутри блока с классом "js-animation_slides"
    private next_slide(dom_element: HTMLDivElement) {
        let current_slide_num = this.get_current_slide_number(dom_element);
        let all_slides = dom_element.querySelectorAll<HTMLImageElement>(`.js-animation_slides__slide`);
        let max_slides = all_slides.length;
        let next_slide = this.get_next_number_slide(max_slides, current_slide_num).toString();

        for (let slide in all_slides) {
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
    }
}

export { animate_slides };
