<script context="module" lang="ts">
	export type AuthUser = {
		id: string;
		username: string;
		name: string;
		role: string | undefined;
		token: string | undefined;
	};
	export const authUser: Writable<AuthUser | undefined> = writable();
</script>

<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { Button } from '$lib/components/ui/button';
	import { User2 } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	function logout() {
		authUser.set(undefined);
		localStorage.clear();
		goto('/');
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8">
			<User2 class="h-5 w-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{$authUser?.name || '-'}</p>
				<p class="text-xs leading-none text-muted-foreground">{$authUser?.role || '-'}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>Ubah Kata Kunci</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={logout}>Keluar</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
