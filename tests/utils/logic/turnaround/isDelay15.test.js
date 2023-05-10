import {
  isDelay15,
  getDelay15Color,
  notValidDelay15Color,
  validDelay15Color,
} from "../../../../src/utils/logic/turnaround/isDelay15";

describe('Testing isDelay15 function', function() {
  it('test turnaround with delay15', function() {
    let result = isDelay15({actual_gate_departure_datetime: "2021-08-17T23:45:00Z", std: "2021-08-17T23:11:00Z"});

    expect(result).toStrictEqual(true);
  });

  it('test turnaround is not delay 15', function() {
    let result = isDelay15({actual_gate_departure_datetime: "2021-08-17T23:05:00Z", std: "2021-08-17T23:11:00Z"});

    expect(result).toStrictEqual(false);
  });

  it('test turnaround missing actual departure datetime', function() {
    let result = isDelay15({actual_gate_departure_datetime: null, std: "2021-08-17T23:11:00Z"});

    expect(result).toStrictEqual(false);
  });
});

describe('Testing getDelay15Color function', function() {
    it('test with not valid Delay 15 color', function() {
      let result = getDelay15Color({actual_gate_departure_datetime: "2021-08-17T23:45:00Z", std: "2021-08-17T23:11:00Z"});
  
      expect(result).toStrictEqual(notValidDelay15Color);
    });
  
    it('test with valid Delay 15 color', function() {
      let result = getDelay15Color({actual_gate_departure_datetime: "2021-08-17T23:05:00Z", std: "2021-08-17T23:11:00Z"});
  
      expect(result).toStrictEqual(validDelay15Color);
    });
  
    it('test with null provide', function() {
      let result = getDelay15Color({actual_gate_departure_datetime: null, std: "2021-08-17T23:11:00Z"});
  
      expect(result).toStrictEqual(validDelay15Color);
    });
  });
