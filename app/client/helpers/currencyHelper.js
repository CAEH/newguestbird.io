Template.registerHelper("currencySymbol", function (currencyCode) {
	if (!_.isString(currencyCode)) {
		return;
	}
	return currenciesDetails[currencyCode].symbol;
});

Template.registerHelper("currencyName", function (currencyCode) {
	if (!_.isString(currencyCode)) {
		return;
	}
	return currenciesDetails[currencyCode].name;
});