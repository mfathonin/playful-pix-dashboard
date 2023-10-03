<script lang="ts">
	import { page } from '$app/stores';
	import ModalRegistrationCode from '$lib/modules/auth/ModalRegistrationCode.svelte';
	import {
		drawerStore,
		modalStore,
		popup,
		type ModalComponent,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	import { Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import type { User } from 'firebase/auth';

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

	const openNavigationDrawer = () => {
		drawerStore.open({
			id: 'navigationDrawer',
			position: 'left'
		});
	};

	const user = $page.data.user as User;
</script>

<div class="container mx-auto py-2 px-3 md:px-6 flex justify-between items-center">
	<div class="flex gap-x-2 items-center">
		<button class="lg:hidden btn-icon hover:variant-soft" on:click={() => openNavigationDrawer()}>
			<i class="bx bx-menu-alt-left text-3xl" />
		</button>
		<h2 class="h2 text-primary-400-500-token">Logo</h2>
	</div>
	<div class="flex gap-4 items-center">
		<div
			class="flex gap-4 items-center py-1 pl-1 pr-1 md:pr-4 rounded-full cursor-pointer group hover:bg-surface-100-800-token"
			use:popup={openProfileMenu}
		>
			<Avatar
				initials={user.email ?? 'MP'}
				width="w-11 h-11"
				background="bg-primary-500-400-token"
				fill="fill-white"
			/>
			<p class="hidden md:flex">{user.email}</p>
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
					formaction="/auth?/logout"
					formmethod="POST"
				>
					<i class="bx bx-log-out-circle bx-sm" /><span>Logout</span>
				</button>
			</form>
		</div>

		<LightSwitch
			class="bg-primary-200 border border-primary-50 dark:border-surface-700 dark:bg-surface-900"
			bgDark="bg-primary-500 dark:bg-surface-100"
			fillDark="fill-primary-500 dark:fill-primary-400-token"
			rounded="rounded-full"
			height="h-6"
			width="w-12"
		/>
	</div>
</div>
