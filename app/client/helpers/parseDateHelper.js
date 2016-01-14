Template.registerHelper('parseDate', function (date) {
  var momentDate = moment(date, 'DD.MM.YYYY');
  var isToday = momentDate.startOf('day').isSame(moment().startOf('day'));

  if (isToday) {
    return 'Today';
  }
  return date;
});
