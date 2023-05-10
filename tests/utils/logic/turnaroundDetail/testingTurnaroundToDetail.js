export const completeTurnaround = {
  status: {
    category: "in_progress"
  },
  all_doors_closed_target_datetime: "2021-06-16T12:00:00Z",
  all_doors_closed_datetime: "2021-06-16T11:55:00Z",
  any_door_opened_datetime: "2021-06-16T12:00:00Z",
  has_any_late_task: true,
  minimum_turnaround_time_seconds: 7200,
  arrival_flight: {
    actual_gate_arrival_datetime: "2021-06-16T11:55:00Z",
    actual_gate_departure_datetime: null,
    actual_runway_arrival_datetime: null,
    actual_runway_departure_datetime: null,
    aircraft: {
      tail_number: "FHZEN",
      name: "A330-300",
      manufacturer_name: "Airbus",
      icao_code: "A359"
    },
    arrival_airport: {
      iata_code: "FDF",
      icao_code: "TFFF",
      name: "Martinique Aime Cesaire International Airport"
    },
    arrival_gate: null,
    arrival_terminal: null,
    carrier_code: "SS",
    departure_airport: {
      iata_code: "ORY",
      icao_code: "LFPO",
      name: "Paris Orly Airport"
    },
    departure_gate: null,
    departure_terminal: null,
    estimated_gate_arrival_datetime: "2021-06-14T12:30:00Z",
    estimated_gate_departure_datetime: "2021-06-14T12:30:00Z",
    estimated_runway_arrival_datetime: null,
    estimated_runway_departure_datetime: null,
    flight_number: "924",
    id: 40456,
    rescheduled_time_arrival_datetime: "2021-06-14T12:45:00Z",
    rescheduled_time_departure_datetime: null,
    sta: "2021-06-14T20:50:00Z",
    status: "SKD",
    std: "2021-06-14T12:00:00Z"
  },
  departure_flight: {
    actual_gate_arrival_datetime: "2021-06-16T11:55:00Z",
    actual_gate_departure_datetime: "2021-06-16T12:10:00Z",
    actual_runway_arrival_datetime: null,
    actual_runway_departure_datetime: null,
    aircraft: {
      tail_number: "FHZEN",
      name: "A330-300",
      manufacturer_name: "Airbus",
      icao_code: "A359"
    },
    arrival_airport: {
      iata_code: "FDF",
      icao_code: "TFFF",
      name: "Martinique Aime Cesaire International Airport"
    },
    arrival_gate: null,
    arrival_terminal: null,
    carrier_code: "SS",
    departure_airport: {
      iata_code: "ORY",
      icao_code: "LFPO",
      name: "Paris Orly Airport"
    },
    departure_gate: null,
    departure_terminal: null,
    estimated_gate_arrival_datetime: null,
    estimated_gate_departure_datetime: "2021-06-14T12:30:00Z",
    estimated_runway_arrival_datetime: null,
    estimated_runway_departure_datetime: null,
    flight_number: "924",
    id: 40456,
    rescheduled_time_arrival_datetime: null,
    rescheduled_time_departure_datetime: "2021-06-14T12:10:00Z",
    sta: "2021-06-14T20:50:00Z",
    status: "SKD",
    std: "2021-06-14T12:00:00Z"
  }
};

export const turnaroundWithDeparture = {
  status: {
    category: "completed"
  },
  all_doors_closed_target_datetime: "2021-06-16T12:00:00Z",
  all_doors_closed_datetime: "2021-06-16T11:55:00Z",
  minimum_turnaround_time_seconds: 7200,
  departure_flight: {
    actual_gate_arrival_datetime: "2021-06-16T11:55:00Z",
    actual_gate_departure_datetime: "2021-06-16T12:10:00Z",
    actual_runway_arrival_datetime: null,
    actual_runway_departure_datetime: null,
    aircraft: {
      tail_number: "FHZEN",
      name: "A330-300",
      manufacturer_name: "Airbus",
      icao_code: "A359"
    },
    arrival_airport: {
      iata_code: "FDF",
      icao_code: "TFFF",
      name: "Martinique Aime Cesaire International Airport"
    },
    arrival_gate: null,
    arrival_terminal: null,
    carrier_code: "SS",
    departure_airport: {
      iata_code: "ORY",
      icao_code: "LFPO",
      name: "Paris Orly Airport"
    },
    departure_gate: null,
    departure_terminal: null,
    estimated_gate_arrival_datetime: null,
    estimated_gate_departure_datetime: "2021-06-14T12:30:00Z",
    estimated_runway_arrival_datetime: null,
    estimated_runway_departure_datetime: null,
    flight_number: "924",
    id: 40456,
    rescheduled_time_arrival_datetime: null,
    rescheduled_time_departure_datetime: "2021-06-14T12:10:00Z",
    sta: "2021-06-14T20:50:00Z",
    status: "SKD",
    std: "2021-06-14T12:00:00Z"
  }
};

export const turnaroundWithArrival = {
  status: {
    category: "in_progress"
  },
  all_doors_closed_target_datetime: null,
  any_door_opened_datetime: "2021-06-16T12:00:00Z",
  minimum_turnaround_time_seconds: 7200,
  arrival_flight: {
    actual_gate_arrival_datetime: "2021-06-16T11:55:00Z",
    actual_gate_departure_datetime: null,
    actual_runway_arrival_datetime: null,
    actual_runway_departure_datetime: null,
    aircraft: {
      tail_number: "FHZEN",
      name: "A330-300",
      manufacturer_name: "Airbus",
      icao_code: "A359"
    },
    arrival_airport: {
      iata_code: "FDF",
      icao_code: "TFFF",
      name: "Martinique Aime Cesaire International Airport"
    },
    arrival_gate: null,
    arrival_terminal: null,
    carrier_code: "SS",
    departure_airport: {
      iata_code: "ORY",
      icao_code: "LFPO",
      name: "Paris Orly Airport"
    },
    departure_gate: null,
    departure_terminal: null,
    estimated_gate_arrival_datetime: "2021-06-14T12:30:00Z",
    estimated_gate_departure_datetime: "2021-06-14T12:30:00Z",
    estimated_runway_arrival_datetime: null,
    estimated_runway_departure_datetime: null,
    flight_number: "924",
    id: 40456,
    rescheduled_time_arrival_datetime: "2021-06-14T12:45:00Z",
    rescheduled_time_departure_datetime: null,
    sta: "2021-06-14T20:50:00Z",
    status: "SKD",
    std: "2021-06-14T12:00:00Z"
  }
};

export const resultTestingCompleteTurnaround = {
  sta: "17:50",
  rta: "09:45",
  eta: "09:30",
  ata: "08:55",
  ado: "09:00",
  aircraft: "A359",
  tail_number: "FHZEN",
  mtt: "02:00",
  adct: "09:00",
  adc: "08:55",
  atd: "09:10",
  std: "09:00",
  rtd: "09:10",
  ptd: "09:30"
};

export const resultTestingTurnaroundWithoutDeparture = {
  sta: "17:50",
  rta: "09:45",
  eta: "09:30",
  ata: "08:55",
  ado: "09:00",
  aircraft: "A359",
  tail_number: "FHZEN",
  mtt: "02:00",
  adct: "--:--",
  adc: "--:--",
  atd: "--:--",
  std: "--:--",
  rtd: "--:--",
  ptd: "--:--"
};

export const resultTestingTurnaroundWithoutArrival = {
  sta: "--:--",
  rta: "--:--",
  eta: "--:--",
  ata: "--:--",
  ado: "--:--",
  aircraft: "A359",
  tail_number: "FHZEN",
  mtt: "02:00",
  adct: "09:00",
  adc: "08:55",
  atd: "09:10",
  std: "09:00",
  rtd: "09:10",
  ptd: "09:30"
};

export const resultTestingError = {
  sta: "--:--",
  rta: "--:--",
  eta: "--:--",
  ata: "--:--",
  ado: "--:--",
  aircraft: "-",
  tail_number: "-",
  mtt: "--:--",
  adct: "--:--",
  adc: "--:--",
  atd: "--:--",
  std: "--:--",
  rtd: "--:--",
  ptd: "--:--"
};
  