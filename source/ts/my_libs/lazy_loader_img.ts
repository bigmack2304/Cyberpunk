import { media_is_mobile, media_is_tablet, is_touch_enabled } from "./media_querys";

/**
    ленивая загрузка для img а также для source в тнутри picture 
    для работы просто подключаем этот скрипт. и в тегах (img и если есть source) указываем новый атрибут data-lazy_src
    у которого значение будет это ссылка на нужную картинку.
    У оригинального (img и если есть source) в качестве картинки можно указать какую нибудь заглушку

    Далее при скролле, когда мы преблизимся к элементу с атрибутом data-lazy_src у нас подменится src (или source в зависимости от тега)
    у img, (и если он внутри picture и srcset во всех source) на содержимое data-lazy_src, после чего data-lazy_src удаляется

    Вконце когда все прогружено обьект обсервера удаляется, также и отписываются его подписчики по мепре прогрузки.


    Данный функционал не понадобился, так как стандартный loading="lazy" вполне устроил.
*/

const observer_options = {
    root: null,
    threshold: 0.01,
    rootMargin: "250px 0px 250px 0px",
};

let observer: IntersectionObserver | null = new IntersectionObserver(intersection_callback, observer_options);
let observe_count = 0;

// провенряем что текущее устройство сенсорный экран с размерами планшета или меньше
function is_mobile_or_tablet_sensor() {
    return (media_is_mobile() || media_is_tablet()) && is_touch_enabled();
}

main();

function main() {
    if (!observer) return;

    const lazy_images = Array.from(document.querySelectorAll<Element>("img[data-lazy_src]"));
    const lazy_data = new Array<Element>().concat(lazy_images);

    if (!is_mobile_or_tablet_sensor()) {
        console.log("lazy motivate");
        for (let lazy_item of lazy_data) {
            observer.observe(lazy_item);
            observe_count++;
        }
        return;
    }

    console.log("lazy standart");
    all_dataSrc_to_src(lazy_data);
}

function all_dataSrc_to_src(lazy_data: Element[]) {
    for (let lazy_item of lazy_data) {
        dataSrc_to_src_or_srcset(lazy_item);
        lazy_item.removeAttribute("data-lazy_src");
    }
}

function intersection_callback(DOM_elements: IntersectionObserverEntry[]) {
    for (let DOM_element of DOM_elements) {
        if (!DOM_element.isIntersecting) continue;
        dataSrc_to_src_or_srcset(DOM_element.target);
        setTimeout(intersection_out_callback.bind(null, DOM_element.target), 1000);
    }
}

function intersection_out_callback(element: Element) {
    if (!observer) return;

    element.removeAttribute("data-lazy_src");
    observer.unobserve(element);
    observe_count--;

    // console.log(observe_count);

    if (observe_count == 0) {
        observer.disconnect();
        observer = null;
        // console.log("observer - bye");
    }
}

function is_picture_element(element: Element | null): element is HTMLPictureElement {
    if (element == null) return false;
    return element.tagName === "PICTURE";
}

function dataSrc_to_src_or_srcset(element: Element) {
    const data_lazy_attr = element.getAttribute("data-lazy_src")!;

    if (element.tagName == "IMG") {
        element.setAttribute("src", data_lazy_attr);

        if (is_picture_element(element.parentElement)) {
            update_picture_sources(element.parentElement);
        }
    }
}

function update_picture_sources(element: HTMLPictureElement) {
    const all_sources = element.querySelectorAll("source");

    for (let source in all_sources) {
        if (!all_sources.hasOwnProperty(source)) continue;

        const data_lazy_src = all_sources[source].getAttribute("data-lazy_src")!;
        all_sources[source].setAttribute("srcset", data_lazy_src);
        all_sources[source].removeAttribute("data-lazy_src");
    }
}

export {};
