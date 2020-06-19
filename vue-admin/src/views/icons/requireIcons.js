const req = require.context('../../icons/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys();

const re = /\.\/(.*)\.svg/;

const icons = requireAll(req).map(i => i.match(re)[1]);

export default icons;
