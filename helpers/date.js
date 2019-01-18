class DateHelper {
  static getCurrentISODateString() {
    console.log('dentro', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'none') return '2019-01-18T00:13:35.393Z';
    return new Date().toISOString();
  }
}

export default DateHelper;
