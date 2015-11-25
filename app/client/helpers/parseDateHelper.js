Template.registerHelper('parseDate', function (date) {
  var date = moment(date, 'DD.MM.YYYY');
  var isToday = date.startOf('day').isSame(moment().startOf('day'));

  if (isToday) {
    return 'Today'
  }
  return date;
});
