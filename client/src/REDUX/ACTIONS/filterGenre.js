export function filterGenre(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}
