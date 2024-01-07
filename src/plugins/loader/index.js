import LoaderComponent from './LoaderComponent';
import './style.scss';

export default {
	install(Vue) {
		Vue.component('loader', LoaderComponent);

		Vue.loader = {
			start() {
				let overlay = document.createElement('div');
				overlay.id = 'page-loader';

				let loader = document.createElement('img');
				loader.src = '/ripple.gif';

				overlay.appendChild(loader);

				document.body.appendChild(overlay);
			},

			stop() {
				document.getElementById('page-loader').remove();
			}
		};

		Object.defineProperties(Vue.prototype, {
			$loader: {
				get() {
					return Vue.loader;
				}
			}
		});
	}
};
