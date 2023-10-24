// медиа запросы для desctop tablet mobile, такиеже как и в CSS

function media_is_desctop() {
    const media_query = window.matchMedia("(min-width: 1025px)");
    return media_query.matches;
}

function media_is_tablet() {
    const media_query = window.matchMedia("(min-width: 321px) and (max-width: 1024px)");
    return media_query.matches;
}

function media_is_mobile() {
    const media_query = window.matchMedia("(min-width: 1px) and (max-width: 320px)");
    return media_query.matches;
}

function media_is_maxPX(valuePX: number) {
    const media_query = window.matchMedia(`(max-width: ${valuePX}px)`);
    return media_query.matches;
}

function is_touch_enabled() {
    return navigator.maxTouchPoints > 0;
}

export { media_is_desctop, media_is_tablet, media_is_mobile, is_touch_enabled, media_is_maxPX };
