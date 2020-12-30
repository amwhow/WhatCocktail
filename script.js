// set up dom elements for all functions
wineName = document.getElementById("cocktailName");
wineImageElement = document.createElement("img")
wineImage = document.querySelector("#avatar")
wineIngredient = document.querySelector("#ingredients")
wineHowTo = document.getElementById("cocktailSteps")

function randomCocktail() {
  randomAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  button = document.querySelectorAll("#randomName")
  for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
      // wineName.innerHTML = "<div class='spinner-grow text-primary' role='status'><span class='sr-only'></span></div>"
      wineIngredient.innerHTML = ''
      if (document.querySelector("#removeAfterClick")) {
        document.querySelector("#removeAfterClick").remove()
      }
      let data = fetch(randomAPI)
      // how to wait till all data are ready and then show them?
      .then(data => data.json())
      .then(response => {
        buildModalInfo(wineName, wineImageElement, wineImage, wineIngredient, wineHowTo, response, 0)
      })
    })
  }
}

// set up cocktail info in modal
function buildModalInfo (a1, a2, a3, a4, a5, response, i) {
  // clear data before each build
  a4.innerHTML = ''
  createdP = document.createElement("p")
  if (a5.children.length > 0) {a5.removeChild(a5.lastChild)}

  a1.textContent = response["drinks"][i]["strDrink"]
  a2.style.width = "180px"
  a2.src = response["drinks"][i]["strDrinkThumb"]
  a3.append(a2)

  // create the ingredient list, 15 is the length of the ingredienand measurements in the API array
  for(k=1; k<=15; k++) {
    let ingredientTemp = response["drinks"][i][`strIngredient${k}`]
    let measurementTemp = response["drinks"][i][`strMeasure${k}`]
    if (ingredientTemp !== null && ingredientTemp !== "" && measurementTemp !== null ) {
      a4.innerHTML += `<li>${ingredientTemp} : ${measurementTemp}</li>`
    }
  }
  // show how to make the cocktail
  createdP.id = "removeAfterClick"
  createdP.textContent = response["drinks"][i]["strInstructions"]
  a5.append(createdP)
}

function Search() {
  const searchForm = document.getElementById("search-bar")
  const searchBar = document.getElementById("search-input");
  const searchDiv = document.getElementById("search-result")
  const searchTitle = document.getElementById("search-title")
  const searchResult = document.getElementById("search-result-list")
  
  searchForm.addEventListener("submit", (event)=> {
    event.preventDefault();
    searchDiv.style.display = "block"
    // clear data before each search
    searchResult.innerHTML = ""
    searchTitle.textContent = "Search Result for"

    searchTitle.textContent += ` '${searchBar.value}':`
    const searchAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchBar.value}`
    let data = fetch(searchAPI).then(response => response.json())
    data.then(result => {
      for(i=0; i<result["drinks"].length; i++) {
        // generate search results, each item is shown as a link
        searchResult.innerHTML += `<a style="text-decoration:underline; cursor:pointer;" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><li id="list_${i}" >${result["drinks"][i]["strDrink"]}</li></a>`
      }
      searchResult.addEventListener("click", (event) => {

        for(i=0; i<result["drinks"].length; i++) {
          if (event.target && event.target.id === `list_${i}`) {
            buildModalInfo(wineName, wineImageElement, wineImage, wineIngredient, wineHowTo, result, i)
          } 
        }
      })
    })
  })
}

randomCocktail()
Search()