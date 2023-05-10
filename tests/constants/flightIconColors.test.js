import { LATE_FLIGHT_ICON_COLOR, ON_TIME_FLIGHT_ICON_COLOR, DEFAULT_FLIGHT_ICON_COLOR, CANCELED_FLIGHT_ICON_COLOR } from '../../src/constants/flightIconColors';

describe('Testing flightIconColors Constants', function() {
  it('late flight icon color - Constant', function() {
    expect(LATE_FLIGHT_ICON_COLOR).toStrictEqual('_RED');
  });

  it('on time flight icon color - Constant', function() {
    expect(ON_TIME_FLIGHT_ICON_COLOR).toStrictEqual('_GREEN');
  });

  it('default flight icon color - Constant', function() {
    expect(DEFAULT_FLIGHT_ICON_COLOR).toStrictEqual('');
  })

  it('canceled flight icon color - Constant', function() {
    expect(CANCELED_FLIGHT_ICON_COLOR).toStrictEqual('_BLACK');
  });
});
