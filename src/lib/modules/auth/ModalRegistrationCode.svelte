<script lang="ts">
	import { registrationCode } from '$lib/utils/factory';
	import { clipboard, modalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let parent: any;

	let toId: number | undefined = undefined;
	let registerCode: string = '';

	const getRegistrationCode = async () => {
		const code = await registrationCode();
		registerCode = code;

		const now = new Date().getSeconds();
		toId = setTimeout(() => getRegistrationCode(), (60 - now) * 1000);

		return toId;
	};

	onMount(() => {
		getRegistrationCode();

		return () => {
			if (toId) clearTimeout(toId);
		};
	});
</script>

{#if $modalStore[0]}
	<div class="bg-surface-50-900-token flex flex-col gap-y-4 shadow-xl rounded-xl p-6">
		<div class="space-y-1">
			<h2 class="h2">Kode Registrasi</h2>
			<p class="text-secondary-300-600-token">Kode verifikasi untuk pembuatan akun baru adalah</p>
		</div>
		<div class="pre flex gap-x-1 items-center py-0 px-1">
			<div class="text-xl flex-1 text-center">{registerCode}</div>
			<div class="divider-vertical h-14" />
			<button class="btn btn-sm font-sans font-normal" use:clipboard={registerCode}>
				<i class="bx bx-copy" />
				<span>Salin</span>
			</button>
		</div>
		<div class="flex justify-end gap-4">
			<button class="btn btn-sm variant-soft-primary" on:click={parent.onClose}>Tutup</button>
		</div>
	</div>
{/if}
