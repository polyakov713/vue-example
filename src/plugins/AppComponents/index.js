import AppButton from './components/AppButton';
import AppInput from './components/AppInput';
import AppTable from './components/AppTable/Index';

export default {
  install(Vue) {
    Vue.component('AppButton', AppButton);
    Vue.component('AppInput', AppInput);
    Vue.component('AppTable', AppTable);
  },
};
