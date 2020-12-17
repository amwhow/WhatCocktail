randomAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
button = document.querySelector("#random").addEventListener("click", () => {
  let data = fetch(randomAPI)
  .then(data => data.json())
  .then(response => {
    wineName = document.getElementById("cocktailName");
    wineName.textContent = response["drinks"][0]["strDrink"]
  })
})
