
let currentPage = 1;
$("#prev").hide();
$("#next").hide();


const showAsideContainer = () => {
  $(".asideContainer").click((event) => {
    let id = event.currentTarget.id;
    $("main").empty()
    console.log(id);
    fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
      .then((response) => response.json())
      .then((recipeData) => {
        console.log(recipeData)
        if($('.recipeIngredient')){
          $("aside").css("height", "auto");
        }
        $("main").append(` <div class="recipeImg">
        <img src="${recipeData.recipe.image_url}" alt="">
        <h1><span>${recipeData.recipe.title}</span></h1>
        </div>
        <div class="recipeDetails">
            <div class="recipeInfo">
                <h6><i class="fa-regular fa-clock"></i> <span>UNKOWN</span> MINUTES</h6>
            </div>
            <div class="recipeInfo">
                <h6><i class="fa-regular fa-user"></i>SERVINGS</h6>
                <div class="servingIco">+</div>
                <div class="servingIco">-</div>
            </div>
            <div class="bookmarkIcon">
                <a href=""><i class="fa-regular fa-bookmark"></i></a>
            </div>
        </div>
        <div class="recipeIngredient">
            <h4>RECIPE INGREDIENTS</h4>
            <div class="recipetDetails">
                ${recipeData.recipe.ingredients.map(ingredient => `<div class="ingredientDetail"><i class="fa-solid fa-check"></i><p>${ingredient}</p></div>`).join('')}  
                
            </div>                  
        </div>
        <div class="webSite">
              <h4>HOW TO COOK IT</h4>
              <p>This recipe was carefully designed and tested by <span>101 Cookbooks</span>. Please check out directions at their website.</p>
              <a href=${recipeData.recipe.publisher_url}/${recipeData.recipe.title} target="_blank"><button>DIRECTION <i class="fa-solid fa-arrow-right"></i></button></a>
          </div>`);
      });
  });
}
$("#FormSearch").submit((event) => {
    event.preventDefault();
    $(".results").empty();
    $(".loader").css("display", "block");
    let value = $("#inputValue").val();
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
      .then((response) => {
        if (response.ok) {
          return response.json();

        } else {
          $("#prev").hide();
          $("#next").hide();
          $(".loader").css("display", "none");
          $("aside").append("<div class='notFound'><i class='fa-solid fa-triangle-exclamation'></i> No recipes found for your query! Please try again ;)</div>");
          return;
        }
      })
      .then((data) => {
        let numberPages = Math.ceil(data.recipes.length / 10);
        data.recipes.slice(0, 10).forEach((recipe) => {
          $(".loader").css("display", "none");
          $(".notFound").css("display", "none");
          $(".results")
            .append(`<div class="asideContainer" id="${recipe.recipe_id}">
              <img src="${recipe.image_url}" />
              <div>
                <p id="trecipeTitle">${recipe.title}</p>
                <p id="trecipeDesc">${recipe.publisher}</p>
              </div>
          </div>`);
        $("#next").show();
        $("#next").val(`Page ${currentPage + 1}`);
        });
        
        $("#next").click(() => {
            currentPage++
            $(".results").empty();
            data.recipes.slice((currentPage - 1) * 10, currentPage * 10).forEach((recipe) => {
                $(".results")
                  .append(`<div class="asideContainer" id="${recipe.recipe_id}">
                    <img src="${recipe.image_url}" />
                    <div>
                      <p id="trecipeTitle">${recipe.title}</p>
                      <p id="trecipeDesc">${recipe.publisher}</p>
                    </div>
                </div>`);
            })
            $("#prev").show();
            $("#prev").val(`Page ${currentPage - 1}`);
            $("#next").val(`Page ${currentPage + 1}`);
            if (currentPage === numberPages) {
                $("#next").hide();
            }
            showAsideContainer();
        })
        $("#prev").click(() => {
            currentPage--
            $(".results").empty();
            data.recipes.slice((currentPage - 1) * 10, currentPage * 10).forEach((recipe) => {
                $(".results")
                  .append(`<div class="asideContainer" id="${recipe.recipe_id}">
                    <img src="${recipe.image_url}" />
                    <div>
                      <p id="trecipeTitle">${recipe.title}</p>
                      <p id="trecipeDesc">${recipe.publisher}</p>
                    </div>
                </div>`);
            })
            $("#next").show();
            $("#prev").val(`Page ${currentPage - 1}`);
            $("#next").val(`Page ${currentPage + 1}`);
            if (currentPage === 1) {
                $("#prev").hide();
            }
            showAsideContainer();
        });
        showAsideContainer();
})});