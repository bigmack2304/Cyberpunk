// элементы появляются с анимацией по мере листания страницы, для этого используем IntersectionObserver
//  - для того чтобы добавить нужному DOM элементу такое поведение нужно внести обьект с его с електором в
//    animate_elements, своиство animate применяет класс с анимацией по этому имяни к DOM елементу.
//    в дальнейшем к этому имяни будут добавлены суффиксы _main _out, примеры анимаций в anims.less
//  - _main добавляет своиство transition к DOM елементу что в дальнейшем позволит плавно проявить элемент
//  - _out скрывает элемент, в момент intersection класс "animate_name"_out удаляется и обьект плавно появляется.
//  - спустя секунду проявленный элемент отписываетя от IntersectionObserver, также в нем удаляеются все системные классы и атрибуты этого скрипта.

type TAnimateElement = { selector: string; animate: string };
type TAnimateElements = TAnimateElement[];

const observer_options = {
    root: null,
    threshold: 0.4,
};

let observer: IntersectionObserver | null = new IntersectionObserver(intersection_callback, observer_options);
let observe_count = 0;

// ищем DOM элементы по селекторам, подписываем их на observer, добавляем классы и атрибуты
function main(animate_elements: TAnimateElements) {
    if (!observer) return;

    for (let data_element of animate_elements) {
        const DOM_elements = document.querySelectorAll(data_element.selector); // ищем все элементы по селектору

        for (let DOM_element in DOM_elements) {
            if (!DOM_elements.hasOwnProperty(DOM_element)) continue; // in проходит и по своиствам прототипа, нам это не нужно

            const target_DOM_element = DOM_elements[DOM_element];

            target_DOM_element.setAttribute("data-animate_name", `${data_element.animate}`);
            target_DOM_element.classList.add(`${data_element.animate}_main`);
            target_DOM_element.classList.add(`${data_element.animate}_out`);
            observer.observe(target_DOM_element);
            observe_count++;
        }
    }
}

// вызывается в момент пересечения элемента
function intersection_callback(DOM_elements: IntersectionObserverEntry[]) {
    for (let DOM_element of DOM_elements) {
        if (!DOM_element.isIntersecting) continue;

        const animate_name = DOM_element.target.getAttribute("data-animate_name");

        if (!animate_name) continue;

        DOM_element.target.classList.remove(`${animate_name}_out`);
        setTimeout(intersection_out_callback.bind(null, DOM_element.target), 1000);
    }
}

// вызывается спустя ~1 sec после intersection_callback, отписываем элемент от observer, удаляем все что мы в него добавляли (классы, атрибуты)
function intersection_out_callback(element: Element) {
    if (!observer) return;

    const animate_name = element.getAttribute("data-animate_name")!;
    element.classList.remove(`${animate_name}_main`);
    element.removeAttribute("data-animate_name");
    observer.unobserve(element);
    observe_count--;

    // console.log(observe_count);

    if (observe_count == 0) {
        observer.disconnect();
        observer = null;
        // console.log("observer - bye");
    }
}

export { main };
export type { TAnimateElement, TAnimateElements };
