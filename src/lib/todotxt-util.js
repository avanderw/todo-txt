// @ts-nocheck
export function removePri(todo) {
    return todo.render().replace(`(${todo.priority()})`, '').trim();
}

export function removeCreatedDate(todo) {
    const date = todo.match(/(\d{4}-\d{2}-\d{2})/)[1];
    return todo.replace(date, '').trim();
}

export function removeDue(todo) {
    const due = todo.match(/(\sdue:\d{4}-\d{2}-\d{2}[\w.+]*)/);
    if (due) {
        return todo.replace(due[0], '').trim();
    }
    return todo;
}