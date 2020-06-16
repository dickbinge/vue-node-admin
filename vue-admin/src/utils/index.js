const isExternal = path => /^(https?:|mailto:|tel:)/.test(path);

const debounce = (func, wait, immediate) => {
  let timeout = 0;
  let args;
  let context;
  let timestamp;
  let result;
  const later = () => {
    const last = +new Date() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(() => {
        later();
      }, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    }
  };
  return (...args) => {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    if (!timeout) {
      timeout = setTimeout(() => {
        later();
      }, wait);
    }
    if (callNow) {
      result = func.apply(context, args);
      context = null;
      args = null;
    }
    return result;
  };
};

export default () => { };
export {
  isExternal,
  debounce,
};
