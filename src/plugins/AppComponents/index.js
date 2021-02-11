import AppButton from './components/AppButton';
import AppInput from './components/AppInput';

export default {
  install(Vue) {
    Vue.component('AppButton', AppButton);
    Vue.component('AppInput', AppInput);
  },
};
