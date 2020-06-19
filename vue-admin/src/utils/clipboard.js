import Vue from 'vue';
import Clipboard from 'clipboard';

const handleClipboard = (text, event) => {
  const clipboard = new Clipboard(event.target, {
    text: () => text,
  });
  clipboard.on('success', () => {
    Vue.prototype.$message.success('Copy successfully');
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    Vue.prototype.$message.error('Copy failed');
    clipboard.off('error');
    clipboard.off('success');
    clipboard.destroy();
  });
  clipboard.onClick(event);
};

export default handleClipboard;
