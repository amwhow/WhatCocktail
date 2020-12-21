// return a random cocktail's name

function randomCocktail() {
  randomAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  button = document.querySelectorAll("#randomName")
  for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", () => {
      wineName.innerHTML = "<div class='spinner-grow text-primary' role='status'><span class='sr-only'></span></div>"
      let data = fetch(randomAPI)
      .then(data => data.json())
      .then(response => {
        wineName.textContent = response["drinks"][0]["strDrink"]
      })
    })
  }
  wineName = document.getElementById("cocktailName");
}
randomCocktail()
