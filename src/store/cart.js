export default {
	state: {
		items: [],
	},

	getters: {
		getCartItems(state) {
			return state.items;
		}
	},

	mutations: {
		setCartItems(state, data) {
			state.items = data;
		}
	},

	actions: {
		setCartItems({ commit }, data) {
			commit('setCartItems', data);
		}
	}
}