import * as api from "./js/localAPI.js";
import * as dom from "./js/dom.js";
import * as util from "./js/utilities.js";
import nav from "./js/nav.js";
import Metro from "./js/Metro.js";
//Build metronome Object
const metro = new Metro("#primSound", "#secSound");
//Init Navigation
const Nav = new nav(
  {
    hash: "#home",
    on: true
  },
  {
    hash: "#mods",
    on: false
  },
  {
    hash: "#saves",
    on: false
  }
);
Nav.init();

///////////////////////////////////
//HOME SECTION
///////////////////////////////////
//Input plus and minus button
dom.tempoInputSelection();

//Base of tempo selection
let baseSelector = document.querySelectorAll(".base-selectors .selector");
baseSelector.forEach(selector => {
  selector.addEventListener("click", e => {
    baseSelector.forEach(e => e.classList.remove("select"));
    e.target.classList.add("select");
  });
});

//Play button
let playBtn = document.querySelector("#home .button-container .button");
playBtn.addEventListener("click", e => {
  metro.isOn = !metro.isOn;
  let tempo = parseInt(document.querySelector("input.tempo-input").value, 10);
  let base = parseInt(
    document.querySelector(".selector.select").getAttribute("data-value"),
    10
  );
  if (metro.isOn) {
    document.querySelector('.button-text').innerHTML = "STOP"
    metro.simplePlay(tempo, base, () => {
      playBtn.classList.toggle("beep");
      setTimeout(()=>{
          playBtn.classList.toggle("beep");
        }, 100)
    });
  }else{
    document.querySelector('.button-text').innerHTML = "PLAY"
  }
});

///////////////////////////////////
//MODS SECTION
///////////////////////////////////

//On load, check the cache to see if there are segments to render
window.addEventListener("load", e => {
  let cache = api.getCacheData();
  if (cache !== null) dom.appendToPage(".list-container", cache);
});

//Select form btn
const addBtn = document.querySelector("form button");

//Test Play button
document.querySelector(".test").addEventListener("click", e => {
  e.preventDefault();
  //Toggle isOn property false/true
  metro.isOn = !metro.isOn;
  if (metro.isOn) {
    //Get all segments from cache
    let part = api.getCacheData();

    //Play cache's partition
    metro.playPartition(part);
  }
});

//Build , appended and save segment from the form
addBtn.addEventListener("click", e => {
  e.preventDefault();
  //Build new segment object from user inputs
  let segment = util.buildSegmentObject();

  //Add to cache data
  //api.addToCache handle render
  api.addToCache(segment);
});


///////////////////////////////////
//SAVES SECTION
///////////////////////////////////