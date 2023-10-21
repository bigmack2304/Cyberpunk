import { safeQuerySelector } from "./safe_querySelector";

const lotery_form = safeQuerySelector(document, ".js-letery_form");
let url_to_image: string = "";

lotery_form.addEventListener("submit", on_submit);

safeQuerySelector(lotery_form, ".letery_form__file").addEventListener("change", on_change);

function on_submit(e: Event) {
    e.preventDefault();
    alert("Форма отправлена!");
}

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

function show_file(url: string) {
    file_attach_text.hidden = true;
    file_previev.hidden = false;
    file_previev.src = url;
}

function close_file() {
    file_attach_text.hidden = false;
    file_previev.hidden = true;
}

export {};
