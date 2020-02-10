export function appendToPage(selector, cache){
  //Determine global parent
  const parent = document.querySelector(selector)

  //If nothing to show return
  if(cache === null) return
  
  //Clear view
  parent.innerHTML = ''

  //Build HTMLElement for each segment inside the cache
  cache.segments.forEach(segment => {
    let div = document.createElement('div')
    div.classList.add("segment")

    let mesure = document.createElement('p')
    mesure.innerHTML = `Mesures: ${segment.mesure}`
    div.appendChild(mesure)

    let base = document.createElement('p')
    base.innerHTML = `Base: ${segment.base}`
    div.appendChild(base)
    
    let tempo = document.createElement('p')
    tempo.innerHTML = `Tempo: ${segment.tempo}`
    div.appendChild(tempo)

    parent.appendChild(div)
  })
}