<template>
	<div class="row my-5 justify-content-center">
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h4 class="card-title mb-4 text-secondary">Reset Your Password</h4>
					<p
						class="card-title"
					>Please enter a registered e-mail. We will send you a link to this e-mail address to reset your password.</p>
					<div class="alert alert-danger" v-if="has_error">{{ error_message }}</div>
					<form @submit.prevent="reset" id="reset-form">
						<div class="form-group">
							<label>Email</label>
							<input
								type="email"
								:class="`form-control ${has_error ? 'is-invalid' : ''}`"
								placeholder="Your Email"
								v-model="user.email"
							/>
						</div>
						<div class="form-group text-right">
							<button class="btn btn-secondary">Reset</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
input {
	&::placeholder {
		font-size: 12px;
	}
}
</style>

<script>
export default {
	data() {
		return {
			user: {
				email: '',
			},
			has_error: false,
			error_message: '',
		};
	},

	methods: {
		reset() {
			this.$loader.start();

			// TODO Hit Reset Password enpoint
			this.$axios
				.post('/api/v1/reset', this.user)
				.then((response) => {
					// We have sent you an email
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