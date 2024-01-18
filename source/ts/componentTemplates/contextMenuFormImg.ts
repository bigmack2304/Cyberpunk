import { dom_parser } from "../my_libs/create_dom_node";
import { safeQuerySelector } from "../my_libs/safe_querySelector";

type TComponentProps = {
    del_callback?: (e: MouseEvent) => void;
};

function component({ del_callback }: TComponentProps = {}) {
    const node_xml = `
        <div class="context_menu_form_img">
            <ul class="context_menu_form_img__items">
                <li class="context_menu_form_img__item_del">Удалить</li>
            </ul>
        </div>`;
    const node_component = dom_parser<HTMLDivElement>(node_xml).children[0] as HTMLDivElement;

    if (del_callback) {
        const li_del = safeQuerySelector<HTMLLIElement>(node_component, ".context_menu_form_img__item_del");
        li_del.onclick = del_callback;
    }

    return node_component;
}

export default component;
