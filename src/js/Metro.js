function Metro(primSoundSelector, secSoundSelector) {
  this.primSound = document.querySelector(primSoundSelector);
  this.secSound = document.querySelector(secSoundSelector);
  this.isOn = false;

  //Simple play function of metronome need a button to toggle on and off
  this.simplePlay = (tempo, base, cb,count = 1) => {
    //Check if metronome is ON
    if (this.isOn === false) return;

    //Convert tempo in milisecondes
    let tempoMs = 60000 / tempo;

    //get count // beat localization in the mesure
    let newCount = count;

    //Handle sound and updating count
    if (count === 1) {
      newCount += 1;
      this.primSound.play();
    } else if (count === base) {
      newCount = 1;
      this.secSound.play();
    } else {
      newCount += 1;
      this.secSound.play();
    }
    cb()
    //Recursive call to keep playing as long as isOn key is set to true
    setTimeout(() => {
      this.simplePlay(tempo, base, cb, newCount);
    }, tempoMs);
  };

  //Take part (Array of segment) and play it
  this.playPartition = (part, idx = 0) => {
    //Check if metronome is ON
    if (this.isOn === false) return;

    //Get segments Array from partition
    const segments = [...part.segments];

    //Check if all segments were played
    if (idx === segments.length) {
      this.isOn = false;
      return;
    } else {
      //Calculate delay in miliseconde
      //(mesureNmber * base) = nmber of beat
      //numbrOfBeat * tempoInMiliseconde = delay in ms
      let delay =
        segments[idx].mesure *
        segments[idx].base *
        (60000 / segments[idx].tempo);

      //Play the segment corresponding to the idx
      this.playSegment(segments[idx]);

      //Recursive call timedout with the delay
      setTimeout(() => {
        //Increment the segment and play
        this.playPartition(part, idx + 1);
      }, delay);
    }
  };

  //Play a single segment
  this.playSegment = segment => {
    //Destructure segment Object
    let { mesure, base, tempo } = segment;

    //Conver tempo in milisecondes
    let tempoMs = 60000 / tempo;

    //Calcule number of count (length of the segment)
    let targetCount = mesure * base;
    let count = 0;

    //Same as simple play with boundary targetCount
    this.activeMetro(tempoMs, base, 1, count, targetCount);
  };

  //Handle sound of a segment
  this.activeMetro = (tempoMs, base, mesureTime, count, targetCount) => {
    let newCount = count + 1;
    let time = mesureTime;

    //Check if segment is finish
    if (count === targetCount) return true;

    //Handle sound et timer
    if (parseInt(mesureTime, 10) === 1) {
      time = time + 1;
      this.primSound.play();
    } else if (parseInt(mesureTime, 10) === parseInt(base, 10)) {
      console.log(time);
      time = 1;
      this.secSound.play();
    } else {
      console.log(time);
      time = time + 1;
      this.secSound.play();
    }

    //Recursive call for the next beat
    setTimeout(() => {
      this.activeMetro(tempoMs, base, time, newCount, targetCount);
    }, tempoMs);
  };
}
export default Metro;
