const fixtures = {
  cityConstraints: {
    cityId: 3421319,
    cityName: 'Nuuk',
    cityCountry: 'GL',
  },
  correctCityInformationResponse:  {
    'main':{
      'temp':290.886,
      'pressure':888.92,
      'humidity':98,
      'temp_min':290.886,
      'temp_max':290.886,
      'sea_level':1027.68,
      'grnd_level':888.92
    },
    'sys':{
      'message':0.0024,
      'country':'GL',
      'sunrise':1547714274,
      'sunset':1547763531
    },
    id: 3421319,
    name: 'Nuuk',
  },
  currentISODateString: '2019-01-18T00:13:35.393Z',
  mismatchCityId: {
    id: 123,
  },
  mismatchCityName: {
    name: 'Wrong name'
  },
  mismatchCityInformationResponse: {
    'main':{
      'temp':290.886,
      'pressure':888.92,
      'humidity':98,
      'temp_min':290.886,
      'temp_max':290.886,
      'sea_level':1027.68,
      'grnd_level':888.92
    },
    'sys':{
      'message':0.0024,
      'country':'BR',
      'sunrise':1547714274,
      'sunset':1547763531
    },
    'id':3445709,
    'name':'Urubici',
  },
  mismatchErrorMessage: 'Mismatch Information',
};
fixtures.formattedCityInformation =  {
  id: fixtures.correctCityInformationResponse.id,
  name: fixtures.correctCityInformationResponse.name,
  country: fixtures.correctCityInformationResponse.sys.country,
  temperature: fixtures.correctCityInformationResponse.main.temp,
  humidity: fixtures.correctCityInformationResponse.main.humidity,
  pressure: fixtures.correctCityInformationResponse.main.pressure,
};

export default fixtures;
