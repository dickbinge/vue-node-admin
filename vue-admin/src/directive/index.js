import dialogDrag from './dialogDrag';
import waves from './waves';
import watermark from './watermark';

export default {
  install: (Vue) => {
    Vue.directive('dialogDrag', dialogDrag);
    Vue.directive('waves', waves);
    Vue.directive('watermark', watermark);
  },
};
