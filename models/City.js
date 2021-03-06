import moment from 'moment';
import DateHelper from '../helpers/date';

class City {
  constructor({id, name, country, temperature, humidity, pressure}) {
    this._id = id;
    this._name = name;
    this._country = country;
    this._temperature = temperature; // Celsius
    this._humidity = humidity; // Percentage
    this._pressure = pressure; // hectoPascal
    this._updatedAt = DateHelper.getCurrentISODateString();
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get country() {
    return this._country;
  }

  set country(value) {
    this._country = value;
  }

  get temperature() {
    return this._temperature;
  }

  set temperature(value) {
    this._temperature = value;
  }

  get humidity() {
    return this._humidity;
  }

  set humidity(value) {
    this._humidity = value;
  }

  get pressure() {
    return this._pressure;
  }

  set pressure(value) {
    this._pressure = value;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get updatedAtToString() {
    return moment(this._updatedAt).format('h:mm:ss a');
  }

  set updatedAt(value) {
    this._updatedAt = value;
  }
}

export default City;
