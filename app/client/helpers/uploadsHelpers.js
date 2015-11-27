Template.registerHelper("uploadedImgPath", function (src) {
	if (!src) {
		return;
	}
	return "/cfs/files/images/" + src;
});
