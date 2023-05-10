import { formatDateToYYYYMMDD } from 'src/utils/logic/date/formattedDate';

export function arrivalFilter(turnarounds, date) {
  const newTurnaroundArrival = turnarounds.filter((turnaround) => turnaround.arrival_flight)
  return newTurnaroundArrival.filter((turnaround) =>
    turnaround.arrival_flight.scheduled_time_arrival_datetime.slice(0, 10) === formatDateToYYYYMMDD(date)
  )
}

export function departureFilter(turnarounds, date) {
  const newTurnaroundDeparture = turnarounds.filter((turnaround) => turnaround.departure_flight)
  return newTurnaroundDeparture.filter((turnaround) =>
    turnaround.departure_flight.scheduled_time_departure_datetime.slice(0, 10) === formatDateToYYYYMMDD(date)
  )
}

export function arrivalAndDepartureFilter(turnarounds, date, arrival, departure) {
  if (arrival === false && departure === true){
    return departureFilter(turnarounds, date)
  }
  else if (arrival === true && departure === false){
    return arrivalFilter(turnarounds, date)
  }
  else if (arrival === false && departure === false){
    return []
  }
  else return turnarounds
}