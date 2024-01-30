// @ts-nocheck
export function removePri(todo) {
    return todo.render().replace(`(${todo.priority()})`, '').trim();
}
