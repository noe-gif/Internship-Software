import React, { useEffect } from 'react';
import 'src/styles/DashboardTimeZoneFilter.css';
import DashboardTimeZoneFilterButton from 'src/components/filter/DashboardTimeZoneFilterButton';
import DashboardTimeZoneFilterClientTimezone from 'src/components/filter/DashboardTimeZoneFilterClientTimezone';
import { ICON_COMPLETE_PATH } from 'src/utils/urlAPIs';
import useTimezoneFilter from 'src/hooks/filter/useTimezoneFilter';
import { timezoneFilterTypes, timezoneFilterValues } from 'src/context/timezoneFilterContext';

export default function DashboardTimeZoneFilter(props) {
  const { airportPicked } = props;
  const { state: { selectedTimezone }, selectTimezone } = useTimezoneFilter();

  const airportsPicked = JSON.parse(process.env.REACT_APP_TIMEZONE_FILTER_AIRPORTS_PICKED || null);
  const airportPickedIsNotInAirports = () => {
    if (!airportsPicked) {
      return false;
    }
    return airportsPicked.length > 0 && airportsPicked.indexOf(airportPicked) === -1;
  };

  useEffect(() => {
    if (airportPickedIsNotInAirports()) {
      selectTimezone({ type: timezoneFilterTypes.LOCAL });
    }
  }, [airportPicked]);

  if (!airportsPicked || !airportPicked || airportPickedIsNotInAirports()) {
    return null;
  }

  return (
    <div className="dashboardTimeZoneFilterWrapper">
      <img className="dashboardTimeZoneFilterEarthIcon" src={`${ICON_COMPLETE_PATH}EARTH_ICON.png`} alt="earthIcon" />
      <div className="dashboardTimeZoneFilterButtonContainer">
        <DashboardTimeZoneFilterButton
          isSelected={selectedTimezone === timezoneFilterValues.UTC}
          clickHandler={() => selectTimezone({ type: timezoneFilterTypes.UTC })}
          text="UTC"
          id="dashboardTimeZoneFilterButtonUtc"
        />
        <hr className="dashboardTimeZoneLineBreak" />
        <DashboardTimeZoneFilterButton
          isSelected={selectedTimezone !== timezoneFilterValues.UTC}
          clickHandler={() => selectTimezone({ type: timezoneFilterTypes.LOCAL })}
          text="My time zone"
          id="dashboardTimeZoneFilterButtonMyTimeZone"
        />
      </div>
      <DashboardTimeZoneFilterClientTimezone />
    </div>
  );
}
