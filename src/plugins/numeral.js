import numeral from 'numeral'

export default {
  install(Vue) {
    Vue.number = {
      format(value) {
        if (Number.isInteger(value)) {
          return numeral(value).format("0,0");
        }
  
        return numeral(value).format("0,0.00");
      }
    };
  
    Object.defineProperties(Vue.prototype, {
      $number: {
        get() {
          return Vue.number;
        }
      }
    });
  }
}
