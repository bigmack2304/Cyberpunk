type TanyFunc = (...args: any[]) => any;

interface ICallStackElement {
    argum: any[];
}

/*
    не позволяет вызывать функцию непрерывно, вместо этого вызывает функцию с последними переданными аргументами
    delay это милисекунды в течении которых вызов функции будет обновлять последние переданные аргументы
    и сбрасывать delay

    После выполнения оборачиваемой функции будет вызвана функция (callback) которую
    мы должны указать.
*/
function first_caller_delay_callback<T extends TanyFunc>(func: T, callback = () => {}, delay: number = 0) {
    let call_stack: ICallStackElement;
    let is_start: boolean = false;
    let timer_id: any = 0;

    return function caller(...args: Parameters<T>): void {
        call_stack = { argum: args };

        const func_call = () => {
            let { argum } = call_stack as ICallStackElement; // трудоемкая процедура
            func(...argum);
            is_start = false;
            callback();
        };

        if (is_start) {
            clearTimeout(timer_id);
        }

        is_start = true; // выставляем флаг работы
        timer_id = setTimeout(func_call, delay);
    };
}

/* 

    декоратор, не позволяет вызывать функцию непрерывно, вместо этого накопливает параметры вызовов
    функции (func) и по интервалу delay вызывает func асинхронно столько раз сколько мы ее вызывали, с темиже параметрами.

    После выполнения всего стека вызовов будет вызвана функция (callback) которую
    мы должны указать.
*/
function caller_delay_callback<T extends TanyFunc>(func: T, callback = () => {}, delay: number = 0) {
    let call_stack: ICallStackElement[] = [];
    let is_start: boolean = false;

    return function caller(...args: Parameters<T>): void {
        call_stack.push({ argum: args });

        const func_call = () => {
            if (call_stack.length >= 1) {
                let { argum } = call_stack.shift() as ICallStackElement; // трудоемкая процедура
                func(...argum);
                setTimeout(func_call, delay);
            } else {
                is_start = false;
                callback();
            }
        };

        if (!is_start) {
            is_start = true; // выставляем флаг работы
            setTimeout(func_call, delay);
        }
    };
}

export { first_caller_delay_callback, caller_delay_callback };
