let ingredientsJson = [];
let dishRecipeJson = [];


//Ingredient class
class Ingredient{
    constructor(name, image, calories){
        this.id = ingredientsJson.length + 1;
        this.name = name;
        this.image = image;
        this.calories = calories;
    }

    render = () => {
        let str = "";
        str = `<div id="item${this.id}"><p>ingredient details: </p>
                <img src="${this.image}" alt="${this.name} picture">
                <span>${this.name} </span>
                <span>calories: ${this.calories} </span></div>`;
        return str;
    }
}

//Recipe class
class DishRecipe{
    constructor(name, ingredients, time, cookingMethod, image){
        this.id = dishRecipeJson.length + 1;
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.cookingMethod = cookingMethod;
        this.image = image;
    }

    render = () => {
        let str = `<div><h3>Dish Recipe details: </h3>
                    <img src="${this.image}" alt="${this.name} picture">
                    <p>dish name: ${this.name} </p>
                    <p>Cooking method: ${this.cookingMethod}</p>
                    <p>Total cooking time: ${this.time} minutes</p>
                    <p>total calories: ${this.getTotalCalories()} </p>
                    <button onclick="showIngredients('${this.id}')" id="${this.id}">Show ingredients</button></div>`;
        return str;
    }

    getTotalCalories = () => {
        let total = 0;
        this.ingredients.map((ingredient) => total += ingredient.calories);
        return total;
    }

    getIngredients = () => {
        let str = "";
        this.ingredients.map((ingredient) => str += ingredient.render());
        return str;
    }
}

//create 4 ingredients at first
const ing1 = new Ingredient('Broccoli', 'https://www.health.harvard.edu/media/content/images/p7_Broccoli_HH1812_gi905351392.jpg', 34);
ingredientsJson.push(ing1);
const ing2 = new Ingredient('Cauliflower', 'http://t3.gstatic.com/images?q=tbn:ANd9GcSeg3atgP35f83U_eFhOPcnD6-ZDUh19g0EhYvLjznjfW4p6tzcSyr1qLHAEA7Q0zPZSJqjUuX-XhQA2aLcggM', 25);
ingredientsJson.push(ing2);
const ing3 = new Ingredient('Nudels', 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Fresh_ramen_noodle_001.jpg', 138);
ingredientsJson.push(ing3);
const ing4 = new Ingredient('Soy sauce', 'https://cdn.shopify.com/s/files/1/0206/9470/products/10683_HFARM_49645309-3_grande.jpeg?v=1441105440', 12);
ingredientsJson.push(ing4);

//create copy of the ingredients array
let exampleIngredients = [...ingredientsJson];

//create recipe object and push it to the dishRecipe array
const dish = new DishRecipe('Pad thai', exampleIngredients, 60, 'sdfsdf', 'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/beef-pad-thai-43f58743.jpg');
dishRecipeJson.push(dish);

//start function
const start = () => {
    let main = document.getElementById("main");
    let str = "";
    dishRecipeJson.map((dish) => str += dish.render());
    main.innerHTML = str;
}

//show the add ingredient form
const addIngredient = () => {
    let str = "";
    str += `<label for="IngredientName">Ingredient name: </label><br><input type="text" id="IngredientName"><br><br>
            <label for="IngredientImage">Ingredient Image (url): </label><br><input type="text" id="IngredientImage"><br><br>
            <label for="IngredientCalories">Ingredient Calories: </label><br><input type="text" id="IngredientCalories"><br><br>
            <button onclick="createIngredient()">Create Ingredient</button> <button onclick="closeForm()">Close</button>
            <h4 id="alert">You need to fill all the fields</h4><hr>`;
    $("#globalForm").html(str);
    $("#globalForm").css("display", "block");
}

//close form button
const closeForm = () => {
  $("#globalForm").html("");
  $("#globalForm").css("display", "none");
}

//create new ingredient function
const createIngredient = () => {
  const name = $("#IngredientName").val();
  const image = $("#IngredientImage").val();
  const calories = $("#IngredientCalories").val();

  if(name == "" || image == "" || calories == ""){
    $("#alert").css("display", "block");
    return;
  }
  const ingredient = new Ingredient(name, image, calories);
  ingredientsJson.push(ingredient);
  closeForm();
}

//show the add recipe form
const addRecipe = () => {
  let str = "";
  let items = "";
  str += `<label for="recipeName">Recipe name: </label><br><input type="text" id="recipeName"><br><br>
          <label for="recipeMethod">Recipe cooking method: </label><br><input type="text" id="recipeMethod"><br><br>
          <label for="recipeTime">Recipe cooking time: </label><br><input type="text" id="recipeTime"><br><br>
          <label for="recipeImage">Recipe Image (url): </label><br><input type="text" id="recipeImage"><br><br>
          <h3>Choose ingredients</h3>
          <div id="formGrid"></div>
          <button onclick="createRecipe()">Create recipe</button> <button onclick="closeForm()">Close</button>
          <h4 id="alert">You need to fill all the fields</h4><hr></div>`;
  $("#globalForm").html(str);
  $("#globalForm").css("display", "block");
  ingredientsJson.map((ingredient) => {
    items += `<label>add <input id="food_${ingredient.id}" type="checkbox">${ingredient.render()}</label>`;
  });
  $("#formGrid").html(items);
}

//create new recipe function
const createRecipe = () => {
  let recipeIngredients = [];
  let ingredients = [];
  const name = $("#recipeName").val();
  const cookingMethod = $("#recipeMethod").val();
  const time = $("#recipeTime").val();
  const image = $("#recipeImage").val();

  if(name == "" || cookingMethod == "" || time == "" || image == ""){
    $("#alert").css("display", "block");
    return;
  }

  let formGrid = document.getElementById("formGrid");
  let inputs = formGrid.getElementsByTagName("input");
  for(input of inputs){
    if(input.checked){
      let arr = input.id.split("_");
      let id = arr[1];
      recipeIngredients.push(parseInt(id));    
    }
  }

  ingredientsJson.map((ingredient) => {
    for(id of recipeIngredients){
      if(id == ingredient.id)
        ingredients.push(ingredient);
    }
  });

  let dish = new DishRecipe(name, ingredients, time, cookingMethod, image);
  dishRecipeJson.push(dish);
  closeForm();
  start();
}

//show the ingredients of the chosen recipe
const showIngredients = (id) => {
  let popupElements = document.getElementById("popupElements");
  let modal = document.getElementById("popupModal");
  let found = dishRecipeJson.filter((dish) => dish.id == id);
  let str = found[0].getIngredients();
  let close = document.getElementsByClassName("close")[0];
  popupElements.innerHTML = str;
  modal.style.display = "block";

  close.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}





