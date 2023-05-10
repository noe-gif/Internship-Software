export default function hasTokenNotExpired(data) {
  return !(Date.parse(data.access_token_expiry) < new Date());
}
