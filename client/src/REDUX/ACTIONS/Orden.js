export function Orden(payload) {
  console.log(payload);
  return {
    type: "ORDEN",
    payload,
  };
}
