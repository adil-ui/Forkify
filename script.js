
let currentPage = 1;
$("#prev").hide();
$("#next").hide();


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
          $(".loader").css("display", "none");
          $("aside").append("<div class='notFound'><i class='fa-solid fa-triangle-exclamation'></i>No recipes found for your query! Please try again ;)</div>");
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
        });
})});