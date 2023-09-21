// @ts-nocheck
import { readable, writable } from "svelte/store";

export const status = writable(null);
export const file = writable(null);
export const todoTxt = writable(null);
export const todoItems = writable(null);
export const filter = writable(null);
export const editTodo = writable(null);
export const iconSize = readable(12);
