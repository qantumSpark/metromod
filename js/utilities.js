export const buildSegmentObject = () => {
  //Build segment object with value in corresponding inputs
  const obj = {
    mesure: document.querySelector('#mesureInput').value,
    base: document.querySelector("#baseInput").value,
    tempo: document.querySelector("#tempoInput").value
  }
  return obj
}