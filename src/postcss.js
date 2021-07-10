const selectorRegExp = /:blank([^\w-]|$)/gi;

const creator = opts => {
	const replaceWith = String(Object(opts).replaceWith || '[blank]');
	const preserve = Boolean('preserve' in Object(opts) ? opts.preserve : true);

	return {
		postcssPlugin: 'css-blank-pseudo',
		Rule: (rule) => {
			if (selectorRegExp.test(rule.selector)) {
				const selector = rule.selector.replace(selectorRegExp, ($0, $1) => {
					return `${replaceWith}${$1}`;
				});

				if (preserve) {
					rule.cloneBefore({ selector: selector });
				} else {
					rule.assign({selector: selector});
				}
			}
		},
	};
};

creator.postcss = true

export default creator
