import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
		path: '/cart',
		name: 'cart',
		component: () =>
			import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
  },
  {
		path: '/checkout',
		name: 'checkout',
		component: () =>
			import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue')
  },
	{
		path: '/thank-you/:id',
		name: 'thank-you',
		component: () =>
			import(/* webpackChunkName: "thank-you" */ '../views/ThankYou.vue')
  },
  {
		path: '/login',
		name: 'login',
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/auth/Login.vue')
	},
	{
		path: '/register',
		name: 'register',
		component: () =>
			import(
				/* webpackChunkName: "register" */ '../views/auth/Register.vue'
			)
	},
	{
		path: '/reset',
		name: 'reset',
		component: () =>
			import(/* webpackChunkName: "reset" */ '../views/auth/Reset.vue')
	},
	{
		path: '/search',
		name: 'search',
		component: () =>
			import(/* webpackChunkName: "search" */ '../views/Search.vue')
	},
	{
		path: '/sell',
		component: () =>
			import(/* webpackChunkName: "sell" */ '../views/Sell.vue'),
		children: [
			{
				path: '',
				name: 'sell.index',
				component: () =>
					import(/* webpackChunkName: "sell.index" */ '../views/sell/Index.vue')
			},
			{
				path: 'register',
				name: 'sell.register',
				component: () =>
					import(/* webpackChunkName: "sell.register" */ '../views/sell/Register.vue')
			},
		]
	},
	{
		path: '/account',
		component: () =>
			import(/* webpackChunkName: "account" */ '../views/Account.vue'),
			children: [
				{
					path: '',
					name: 'my-account.show',
					component: () =>
						import(/* webpackChunkName: "my-account.index" */ '../views/account/Account.vue')
				},
				{
					path: 'password',
					name: 'my-account.password',
					component: () =>
						import(/* webpackChunkName: "my-account.password" */ '../views/account/Password.vue')
				},
				{
					path: 'profile',
					name: 'my-account.profile',
					component: () =>
						import(/* webpackChunkName: "my-account.profile" */ '../views/account/Profile.vue')
				},
				{
					path: 'orders',
					name: 'orders.index',
					component: () =>
						import(/* webpackChunkName: "orders.index" */ '../views/account/Orders.vue')
				},
				{
					path: 'orders/:id',
					name: 'orders.show',
					component: () =>
						import(/* webpackChunkName: "orders.show" */ '../views/account/Order.vue')
				},
			]
	},
  {
    path: '/:slug',
    name: 'resource',
    component: () => import(/* webpackChunkName: "resource" */ '../views/Resource.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
		return { x: 0, y: 0 };
	},
  routes
})

export default router
