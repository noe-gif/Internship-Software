export const RTA = 'rta';
export const ATA = 'ata';
export const ADO = 'ado';
export const ADC = 'adc';
export const ATD = 'atd';
export const RTD = 'rtd';
export const DEFAULT = 'default';
export const SUCCESS = 'success';
export const FAIL = 'fail';
export const LOADING = 'loading';
export const DAY = 1;
export const TEMPLATE_RANDOM_DATE = '01/01/2007';
export const NEXT_HOUR = 1;
export const CURRENT_HOUR = 0;
export const MAX_HOUR_DIFFERENCE = 12;
export const NB_HOURS_IN_DAY = 24;
export const TASK_TIMING_TARGET = 1;

export const acronymFlightTiming = {
  rta: 'rescheduled_time_arrival_datetime',
  ata: 'actual_gate_arrival_datetime',
  atd: 'actual_gate_departure_datetime',
  rtd: 'rescheduled_time_departure_datetime',
  adc: 'all_doors_closed_datetime',
  ado: 'any_door_opened_datetime',
};

export const errorStatusMessage = {
  200: '',
  500: 'Failed to register new timing',
  403: "You don't have the authorization to modify this value",
  400: 'The information that you provide is not valid',
  401: 'The access token provided is invalid',
};
