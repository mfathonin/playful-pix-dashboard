<script lang="ts">
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import type { ContentDigitalModel } from '$lib/models/contents';

	const contents =
		$page.status === 403
			? (JSON.parse($page.error?.message ?? '{}') as unknown as ContentDigitalModel[])
			: undefined;
</script>

<div class="bg-surface-100-800-token w-screen h-screen overflow-hidden">
	<div class="flex flex-col gap-4 h-full mx-auto max-w-md items-center justify-center text-center">
		<div class="h1 text-primary-400-500-token mb-16">
			<img src="/icon-256x256.png" alt="Prodigi" class="w-24 h-24" />
		</div>
		{#if $page.status === 404}
			<div class="h2">Tidak ada konten</div>
			<div class="text-sm text-surface-400-500-token">
				Konten yang kamu cari tidak ditemukan. Periksa kembali link atau QR Code yang kamu akses
			</div>
			<div class="h-[42] mt-10"><p /></div>
		{:else if $page.status === 403}
			<div
				class="text-error-400-500-token border border-error-600-300-token p-0.5 px-3 rounded-full"
			>
				Akses terbatas
			</div>
			<div>
				<p class="text-md">Konten</p>
				<p class="h2 font-semibold">{contents?.map((c) => c.title).join(', ')}</p>
			</div>
			<div class="text-sm text-surface-400-500-token">
				Bila kamu ingin membuka konten digital ini, harap gunakan aplikasi Prodigi kami.
			</div>
			<button
				class="btn variant-filled-primary mt-10"
				on:click={() =>
					window.open(
						env.PUBLIC_APP_ID
							? `https://play.google.com/store/apps/details?id=${env.PUBLIC_APP_ID}`
							: 'https://play.google.com/store/search?q=prodigi&c=apps',
						'_blank'
					)}
			>
				Download di PlayStore</button
			>
		{/if}
	</div>
</div>
