import * as dom from "./dom.js";

//Save an object (partition) to localStorage
export const saveToLocalStorage = obj => {
  //Get and parse data
  let data = JSON.parse(window.localStorage.getItem("data"));

  //Push new item into data
  data.partitions.push(obj);

  //Clear storage of old data
  window.localStorage.removeItem("data");

  //Save new data to localStorage
  window.localStorage.setItem("data", JSON.stringify(data));
};

//Get all data (partitions) from localStorage
export const getFromLocalStorage = () => {
  const data = JSON.parse(window.localStorage.getItem("data"));
  return data;
};

//Get one by name from localStorage
export const getOneFromLocalStorage = name => {
  //Get all and parse
  const data = JSON.parse(window.localStorage.getItem("data"));

  //Filter with the name
  const result = data.partitions.filter(part => part.name === name);

  //Return the result
  return result[0];
};

//Get all cache data (segments)
export const getCacheData = () => {
  let raw = window.localStorage.getItem("cache");
  return JSON.parse(raw);
};

//Add a new segment to the cache
export const addToCache = (obj, cb) => {
  //Get all cache datas
  let cache = window.localStorage.getItem("cache");

  //Declare variable for later
  let forRender;

  //If cache exist, copy , update and replace old cache
  if (cache !== null) {
    //Copy old cache
    let newCache = { ...JSON.parse(cache) };

    //Push new segment
    newCache.segments.push(obj);

    //Updated cache is copied for later
    forRender = { ...newCache };

    //Delete old cache
    window.localStorage.removeItem("cache");

    //Set new cache to replace old one
    window.localStorage.setItem("cache", JSON.stringify(newCache));
  } else {
    //Cache doesn't exist

    //Create a new cache with correct data structure
    let newCache = { segments: [obj] };

    //Updated cache is copied for later
    forRender = { ...newCache };

    //Set new cache in localStorage
    window.localStorage.setItem("cache", JSON.stringify(newCache));
  }

  //Updated Cache saved before is use to render the segments on the page
  dom.appendToPage(".list-container", forRender);
};
