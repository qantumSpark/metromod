import * as api from "./js/api.js"
import * as dom from "./js/dom.js";

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
//api.newCollection("mods-cache")
window.addEventListener('load', () => api.getCollection("mods-cache").forEach(item => renderSegment(item, "#mods .list-container")))

const addBtn = document.querySelector('#modsAddButton')
addBtn.addEventListener('click', addFormBtnClicked)

const playModulesButton = document.querySelector('.play-button.mod-button')
playModulesButton.addEventListener('click', modulePlayButtonHandler)

function modulePlayButtonHandler(event) {
  let partition = {
    name: 'Cache live playing',
    segments: api.getCollection('mods-cache')
  }
  console.log('clicked');
  metro.isOn = !metro.isOn
  
  metro.playPartition(partition, ()=>{
    document.querySelector('.mods-led').classList.add('beep')
    setTimeout(() => {
      document.querySelector('.mods-led').classList.remove('beep')
    }, 100);
  })
  
}

//To export in modules

function addFormBtnClicked(event) {
  const mesureInput = document.querySelector("#mesureInput").value
  const baseInput = document.querySelector("#baseInput").value
  const tempoInput = document.querySelector("#tempoInput").value
  const segment = {
    mesure: mesureInput,
    base: baseInput,
    tempo : tempoInput
  }
  api.addItem("mods-cache", segment) 
  refreshView("mods-cache", "#mods .list-container")
}

function renderSegment(obj, selectorContainer) {
  let container = document.querySelector(selectorContainer)
  let { mesure, base, tempo, id } = obj

  const svg_delete = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.6174 13.6514L9.02058 10.1783L5.54746 13.7752L4.3485 12.6175L7.82162 9.02062L4.22476 5.5475L5.38247 4.34854L8.97933 7.82166L12.4525 4.2248L13.6514 5.38251L10.1783 8.97937L13.7751 12.4525L12.6174 13.6514Z" fill="#0B223C" fill-opacity="0.5"/>
  </svg>`

  let segment = document.createElement('div')
  segment.classList.add('mods-segment')
  segment.setAttribute('id', id)
  segment.innerHTML = `
    <h5 class="segment-mesures">Mesures: <span>${mesure}</span> </h5>
    <h5 class="segment-mesures">Base: <span>${base}</span> </h5>
    <h5 class="segment-mesures">Tempo: <span>${tempo}</span> </h5>
    <div class="segment-delete" >${svg_delete}</div>
  `
  container.appendChild(segment)
  //console.log(segment.childNodes[7]);
  
  segment.childNodes[7].addEventListener('click', e => {
    //console.log('clicked');
    api.deleteItem("mods-cache", id)
    document.getElementById(id).style.opacity = "0"
    document.getElementById(id).style.transform = "scaleY(-100%)"
    document.getElementById(id).style.height = "0px"
    setTimeout(()=>refreshView("mods-cache", "#mods .list-container"), 300)
  })
}

function clearList(selector) {
  const container = document.querySelector(selector)
  container.innerHTML = ''
}

function refreshView(collection, selector){
  clearList(selector)
  api.getCollection(collection).forEach(item => renderSegment(item, selector))
}
//On load, check the cache to see if there are segments to render
// window.addEventListener("load", e => {
//   let cache = api.getCacheData();
//   if (cache !== null) dom.appendToPage(".list-container", cache);
// });

// //Select form btn
// const addBtn = document.querySelector("form button");

// //Test Play button
// document.querySelector(".test").addEventListener("click", e => {
//   e.preventDefault();
//   //Toggle isOn property false/true
//   metro.isOn = !metro.isOn;
//   if (metro.isOn) {
//     //Get all segments from cache
//     let part = api.getCacheData();

//     //Play cache's partition
//     metro.playPartition(part);
//   }
// });

// //Build , appended and save segment from the form
// addBtn.addEventListener("click", e => {
//   e.preventDefault();
//   //Build new segment object from user inputs
//   let segment = util.buildSegmentObject();

//   //Add to cache data
//   //api.addToCache handle render
//   api.addToCache(segment);
// });


///////////////////////////////////
//SAVES SECTION
///////////////////////////////////