import { writable, type Writable } from 'svelte/store';
import type { AuthUser } from './types/Auth';
import type { TModal } from './types/Component';

export const modal: Writable<TModal> = writable();
export const authUser: Writable<AuthUser | undefined> = writable();
