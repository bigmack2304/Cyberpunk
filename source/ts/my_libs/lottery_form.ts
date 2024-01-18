import { safeQuerySelector } from "./safe_querySelector";
import contextMenuNode from "./../componentTemplates/contextMenuFormImg";
import { get_cursor_position } from "./util_functions";

const lotery_form = safeQuerySelector(document, ".js-letery_form");
let url_to_image: string = "";

lotery_form.addEventListener("submit", on_submit);

const file_input = safeQuerySelector<HTMLInputElement>(lotery_form, ".letery_form__file");
file_input.addEventListener("change", on_change);

// отправка формы
function on_submit(e: Event) {
    const formData = new FormData(e.target as HTMLFormElement);
    e.preventDefault();
    alert(`Форма отправлена! (имя: ${formData.get("name")}, email: ${formData.get("email")})`);
}

// загрузка фаила в форму
function on_change(e: Event) {
    const filelist = (e.target as HTMLInputElement).files ?? [];

    // если в списке есть выбранная картинка
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

const file_attach_text = safeQuerySelector<HTMLSpanElement>(lotery_form, ".letery_form__file_attach_text");
const file_previev = safeQuerySelector<HTMLImageElement>(lotery_form, ".letery_form__file_previev");

file_previev.addEventListener("contextmenu", on_context_menu);
let contextMenu: HTMLDivElement | undefined = undefined;

// контролирует закрытие контекстного меню, когда оно отерыто
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function is_visible_remove() {
    if (contextMenu) {
        remove_contextMenu();
    }
}

function on_scroll_remove() {
    is_visible_remove();
    remove_contextMenu_listeners();
}

function on_click_remove(e: PointerEvent) {
    if (e.target !== contextMenu) {
        is_visible_remove();
        remove_contextMenu_listeners();
    }
}

function contevt_menu_viev_control() {
    window.addEventListener("scroll", on_scroll_remove);
    document.addEventListener("click", on_click_remove as EventListener);
}

function remove_contextMenu_listeners() {
    window.removeEventListener("scroll", on_scroll_remove);
    document.removeEventListener("click", on_click_remove as EventListener);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// контекстное меню для картинки, (открытие)
function on_context_menu(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    // нажатие на опцию удалить
    function on_delete(this: Element, e: MouseEvent) {
        remove_contextMenu();
        close_file();
    }

    if (contextMenu) {
        remove_contextMenu();
    }

    // создаем ноду контекстного меню, добавляем в DOM
    contextMenu = contextMenuNode({ del_callback: on_delete });
    lotery_form.insertAdjacentElement("afterend", contextMenu);
    const pos = get_cursor_position.bind(contextMenu)(e);
    Object.assign(contextMenu.style, { top: `${pos.y}px`, left: `${pos.x}px` });
    contevt_menu_viev_control();
}

// отобразить загруженный фаил
function show_file(url: string) {
    file_attach_text.hidden = true;
    file_previev.hidden = false;
    file_previev.src = url;
}

// удалить загруженный фаил
function close_file() {
    file_attach_text.hidden = false;
    file_previev.hidden = true;
    file_previev.removeAttribute("src");
    file_input.value = "";
}

// удаляет контекстное меню
function remove_contextMenu() {
    if (contextMenu) {
        contextMenu.remove();
        contextMenu = undefined;
        remove_contextMenu_listeners();
    }
}

export {};
