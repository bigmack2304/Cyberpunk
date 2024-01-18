function dom_parser<T extends Element>(xmlString: string) {
    const placeholder = document.createElement("div");
    placeholder.innerHTML = xmlString;
    const node = placeholder;

    return node as any as T;
}

export { dom_parser };
