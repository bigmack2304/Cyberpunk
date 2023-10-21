// устанавливает aria-hidden = "true", tabindex= "-1" для всех DOM елементов с классом disabled

main();

function main() {
    const DOM_elements = document.querySelectorAll<HTMLElement>(".js-disabled");
    for (let element_name in DOM_elements) {
        if (!DOM_elements.hasOwnProperty(element_name)) continue;
        DOM_elements[element_name].setAttribute("aria-hidden", "true");
        DOM_elements[element_name].setAttribute("tabindex", "-1");
    }
}

export {};
