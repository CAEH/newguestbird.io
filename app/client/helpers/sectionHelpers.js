Template.registerHelper("sections", function () {
	return Items.getShopSections();
});

Template.registerHelper("sectionItems", function (section) {
	return Items.getSectionItems(section);
});

Template.registerHelper("sectionLength", function (section) {
	return Items.getShopSections().length;
});