// @ts-nocheck
import { writable } from "svelte/store";

export const file = writable(null);
export const todoTxt = writable(null);
export const todoItems = writable(null);
export const filter = writable(null);
export const editTodo = writable(null);

todoItems.subscribe((value) => {
    if (value) {
        value.sort((a, b) => a.render().localeCompare(b.render()));
    }
});