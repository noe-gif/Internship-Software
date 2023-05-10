import React, { useEffect } from 'react';

import Header from 'src/containers/header/headerContainer';
import DashboardHeader from 'src/components/header/dashboardHeader';
import Footer from 'src/components/footer/footer';
import HomeContent from 'src/containers/home/homeContentContainer';
import { TimezoneFilterProvider } from 'src/context/timezoneFilterContext';

export default function Home(props) {
  const {
    accessToken,
    airportPicked,
    turnaroundRequestAction,
  } = props;

  useEffect(() => {
    const fetchTurnarounds = async () => {
      const dateFilterRange = [new Date(), new Date()];
      await turnaroundRequestAction(
        accessToken,
        dateFilterRange,
        airportPicked,
      );
    };
    fetchTurnarounds();
  }, []);

  return (
    <TimezoneFilterProvider>
      <div className="home">
        <Header />
        <DashboardHeader airportPicked={airportPicked} />
        <div className="colTurnaroundsContainer">
          <HomeContent />
        </div>
        <Footer />
      </div>
    </TimezoneFilterProvider>
  );
}
