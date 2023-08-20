<script lang="ts">
	import ModalRegistrationCode from '$lib/modules/auth/ModalRegistrationCode.svelte';
	import {
		modalStore,
		popup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';

	const openProfileMenu: PopupSettings = {
		event: 'click',
		target: 'openProfileMenu',
		placement: 'bottom-end'
	};

	const registrationCodeModalComponent: ModalComponent = {
		ref: ModalRegistrationCode
	};

	const openRegistrationCodeModal: ModalSettings = {
		type: 'component',
		component: registrationCodeModalComponent
	};
</script>

<div class=" container mx-auto py-2 px-4 md:px-8 flex justify-between items-center">
	<h2 class="h2">Logo</h2>
	<div class="flex gap-4 items-center">
		<div
			class="flex gap-4 items-center py-1 pl-1 pr-4 rounded-full cursor-pointer group hover:bg-surface-200-700-token"
			use:popup={openProfileMenu}
		>
			<Avatar
				initials="A"
				fallback="A"
				width="w-11 h-11"
				border="border-2 border-surface-200-700-token group-hover:!border-primary-500"
			/>
			<p class="hidden md:flex">User email</p>
		</div>

		<div class="card py-3 px-2 min-w-[200px] shadow-xl" data-popup="openProfileMenu">
			<button
				class="hover:bg-surface-300-600-token p-2 rounded-lg flex w-full gap-x-2 text-start items-center"
				on:click={() => modalStore.trigger(openRegistrationCodeModal)}
			>
				<i class="bx bx-user-plus bx-sm" />
				<span>Kode Registrasi</span>
			</button>
			<form class="hover:bg-surface-300-600-token p-2 rounded-lg">
				<button
					class="flex w-full text-start gap-x-2 items-center"
					formaction="/api/v1/logout"
					formmethod="POST"
				>
					<i class="bx bx-log-out-circle bx-sm" /><span>Logout</span>
				</button>
			</form>
		</div>

		<LightSwitch rounded="rounded-full" height="h-5" width="w-10" />
	</div>
</div>
