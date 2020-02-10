import * as api from "./js/localAPI.js";
import * as dom from "./js/dom.js";
import * as util from "./js/utilities.js";
import Metro from "./js/Metro.js";


//On load, check the cache to see if there are segments to render
window.addEventListener("load", e => {
  let cache = api.getCacheData();
  if(cache !== null) dom.appendToPage(".list-container", cache);
});

//Build metronome Object
const metro = new Metro("#primSound", "#secSound");

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
