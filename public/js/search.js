window.addEventListener("load", function () {
    let searchBar = document.querySelector(".form-buscador");
    let submitform = document.querySelector(".formSearch");
    let section = document.querySelector("section");
    console.log(section);

    searchBar.addEventListener("input", (e) => {
        let value = e.target.value;
        if (value && value.trim().length >= 3) {
            console.log("esto buscaste " + value);
            let searchform = (document.querySelector(".formSearch").action = "/products/search/" + value);
            console.log(searchform);
            console.log(submitform);
        }
    });

});
