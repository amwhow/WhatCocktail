// return a random cocktail's name

function randomCocktail() {
  randomAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  button = document.querySelectorAll("#randomName")
  for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
      wineName.innerHTML = "<div class='spinner-grow text-primary' role='status'><span class='sr-only'></span></div>"
      wineIngredient.innerHTML = ''
      if (document.querySelector("#removeAfterClick")) {
        document.querySelector("#removeAfterClick").remove()
      }
      let data = fetch(randomAPI)
      // how to wait till all data are ready and then show them?
      .then(data => data.json())
      .then(response => {
        // show cocktail name and avatar
        wineName.textContent = response["drinks"][0]["strDrink"]
        wineImageElement.style.width = "180px"
        wineImageElement.src = response["drinks"][0]["strDrinkThumb"]
        wineImage.append(wineImageElement)

        // create the ingredient list
        for(i=1; i<=15; i++) {
          let ingredientTemp = response["drinks"][0][`strIngredient${i}`]
          let measurementTemp = response["drinks"][0][`strMeasure${i}`]
          if (ingredientTemp !== null && ingredientTemp !== "" && measurementTemp !== null ) {
            wineIngredient.innerHTML += `<li>${ingredientTemp} : ${measurementTemp}</li>`
          }
        }
        // show how to make the cocktail
        createdP = document.createElement("p")
        createdP.id = "removeAfterClick"
        createdP.textContent = response["drinks"][0]["strInstructions"]
        wineHowTo.append(createdP)
      })
    })
  }
  // select elements in DOM tree
  wineName = document.getElementById("cocktailName");
  wineImageElement = document.createElement("img")
  wineImage = document.querySelector("#avatar")
  wineIngredient = document.querySelector("#ingredients")
  wineHowTo = document.getElementById("cocktailSteps")
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
    let data = fetch(searchAPI)
    .then(response => response.json())
    .then(result => {
      for(i=0; i<result["drinks"].length; i++) {
        searchResult.innerHTML += `<li>${result["drinks"][i]["strDrink"]}</li>`
      }
    })
  })
}

randomCocktail()
Search()