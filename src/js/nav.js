export default function nav(...arg) {
  this.hashLocation = arg
  this.init = () => {
    window.addEventListener('hashchange', this.hashChangeHandler)
  }
  this.hashChangeHandler = event => {
    event.preventDefault()
  
    const oldHash = this.hashLocation.filter(e => e.on)[0].hash
    const newHash = location.hash
  
  //Change state
    this.hashLocation.forEach(e => {
      if(e.hash === oldHash || e.hash === newHash){
        e.on = !e.on
      }
    })
    console.log(this.hashLocation);
    
    navigateFromTo(oldHash, newHash)
  }


  function navigateFromTo(idSelectorOfOrigin, idSelectorOfDestination){
    const originPage = document.querySelector(idSelectorOfOrigin)
    const destinationPage = document.querySelector(idSelectorOfDestination)
    originPage.classList.add("hiddenPage")
    destinationPage.classList.remove("hiddenPage")
  }

}