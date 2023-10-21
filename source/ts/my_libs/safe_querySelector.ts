// обертка над querySelector, если тот вернет null, бросаем исключение
function safeQuerySelector<T extends Element>(target: Element | Document, selector: string) {
    let result = target.querySelector<T>(selector);
    if (result == null) {
        throw new Error(`'${selector}' not found`);
    }
    return result;
}

// обертка над safeQuerySelectorAll, если тот вернет пустой NodeListOf, бросаем исключение
function safeQuerySelectorAll<T extends Element>(target: Element | Document, selector: string) {
    let result = target.querySelectorAll<T>(selector);
    if (result.length === 0) {
        throw new Error(`'${selector}' not found`);
    }
    return result;
}

export { safeQuerySelector, safeQuerySelectorAll };
