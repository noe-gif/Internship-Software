process.env.REACT_APP_TIMEZONE_FILTER_AIRPORTS_PICKED = '["MXP"]'

export const removeAllAirportsToEnvVar = () => {
    process.env.REACT_APP_TIMEZONE_FILTER_AIRPORTS_PICKED = '[]'
 }