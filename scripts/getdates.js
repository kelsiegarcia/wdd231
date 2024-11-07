const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastmodified");

const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

modified.innerHTML = `Last Modified: ${document.lastModified}`