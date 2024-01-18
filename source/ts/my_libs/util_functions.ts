// возвращает позицию курсора из события на ДОМ элементе
function get_cursor_position(this: Element, evt: MouseEvent) {
    const target = this.getBoundingClientRect();
    const x = evt.clientX - target.left;
    const y = evt.clientY - target.top;

    return {
        x: x,
        y: y,
    };
}

export { get_cursor_position };
