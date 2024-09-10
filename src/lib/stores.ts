import { writable } from "svelte/store";
import type { Pokemon } from "./types";

export const missing = writable<Pokemon[]>();
export const caught = writable<Pokemon[]>();
