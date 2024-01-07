<template>
	<div class="container bg-white">
		<div class="row my-5">
			<div class="col-md-6">
				<div class="car">
					<div class="card-body">
						<h4 class="card-title mb-4">Login</h4>
						<div class="alert alert-danger" v-if="has_error">{{ error_message }}</div>
						<form @submit.prevent="login" id="login-form">
							<div class="form-group">
								<label>New Password</label>
								<input
									type="password"
									:class="`form-control ${has_error ? 'is-invalid' : ''}`"
									placeholder="********"
									v-model="user.password"
								/>
							</div>
							<div class="form-group">
								<label>Confirm New Password</label>
								<input
									type="password"
									:class="`form-control ${has_error ? 'is-invalid' : ''}`"
									placeholder="Your Email"
									v-model="user.password_confirmation"
								/>
							</div>
							<div class="form-group text-right">
								<button class="btn btn-secondary">Create New Password</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div class="col-md-6 d-desktop">
				<div class="car">
					<div class="card-body text-center">
						<h4 class="card-title text-secondary">Create your Mduka account</h4>
						<p
							class="pt-3"
						>Create your Mduka customer account in just a few clicks! You can register either using your e-mail address or through your Facebook account.</p>
						<div style="height: 150px"></div>
						<router-link
							:to="{ name: 'register', query: { next: $route.query.next }}"
							class="btn btn-secondary btn-block"
						>Register</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	beforeMount() {
		if (this.$auth.hasToken()) {
			this.$router.push({ name: 'account' });
		}
	},

	data() {
		return {
			user: {
				email: '',
				password: '',
			},
			has_error: false,
			error_message: '',
		};
	},

	methods: {
		login() {
			this.$loader.start();

			this.$axios
				.post('/api/v1/login', this.user)
				.then((response) => {
					this.$auth.setToken(response.data.access_token);
					window.location.href = this.$route.query.next
						? this.$router.resolve({ path: this.$route.query.next })
								.href
						: this.$router.resolve({ name: 'home' }).href;
					this.$loader.stop();
				})
				.catch((error) => {
					this.has_error = true;
					this.error_message = error.response.data.message;
					this.$loader.stop();
				});
		},
	},
};
</script>