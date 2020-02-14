export default function nav(...arg) {
  this.hashLocation = arg
  this.init = () => {
    window.addEventListener('hashchange', this.hashChangeHandler)
  }
  this.hashChangeHandler = event => {
    event.preventDefault()
    let oldHash
    if(this.hashLocation.filter(e => e.on)[0] === undefined){
      oldHash = "#home"
    }else{
       oldHash = this.hashLocation.filter(e => e.on)[0].hash
    }
    const newHash = location.hash
  
  //Change state
    this.hashLocation.forEach(e => {
      if(e.hash === oldHash || e.hash === newHash){
        e.on = !e.on
      }
    })
    //console.log(this.hashLocation);
    
    navigateFromTo(oldHash, newHash)
  }
}
function navigateFromTo(idSelectorOfOrigin, idSelectorOfDestination){
  const originPage = document.querySelector(idSelectorOfOrigin)
  const destinationPage = document.querySelector(idSelectorOfDestination)
  destinationPage.style.transform = "translateY(50vh)"
  destinationPage.style.opacity = ".2"
  originPage.style.transform = "translateY(50vh)"
  originPage.style.opacity = "0"

  setTimeout(() => {
    originPage.classList.add("hiddenPage")
    destinationPage.classList.remove("hiddenPage")
    destinationPage.style.transform = "translateY(0)"
    destinationPage.style.opacity = "1"
  }, 300)
}
