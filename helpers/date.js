class DateHelper {
  static getCurrentISODateString() {
    return new Date().toISOString();
  }
}

export default DateHelper;
