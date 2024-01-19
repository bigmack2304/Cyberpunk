// возвращает позицию курсора из события на ДОМ элементе
function get_cursor_position(this: Element, evt: MouseEvent) {
    const target = this.getBoundingClientRect();

    // пока этот код юзается только для одного элемента.
    // getBoundingClientRect в моем случае не всегда правильно высчитывает положение left (из за своиства родителя max-width, а другой родитель его центрует) , поэтому вручную его корректирую
    // в исходя из стилей max-width.
    // посути это делает этот код не переиспользуемым
    const offset = () => {
        let offset = window.innerWidth - 1280;
        if (offset >= 0) {
            return Math.floor(offset / 2);
        }

        return 0;
    };

    const x = evt.clientX - target.left + offset();
    const y = evt.clientY - target.top;

    return {
        x: x,
        y: y,
    };
}

export { get_cursor_position };
