window.onload = () => {

    let form = document.querySelector("form-user")
    let errorsList = document.querySelector(".errorList")

    form.addEventListener("submit", (e) => {

        let errorBullets = document.querySelectorAll("li");
        if (errorBullets.length > 0 && errorBullets[0]) {
            let errorsArray = [...errorBullets];
            errorsArray.map((e) => {
                e.remove();
            });
        }
        let errors = [];

        if (form.name.value == "") {
            errors.push("Tienes que escribir un nombre");
        } if (form.name.value.length < 2) {
            errors.push("El Nombre debe tener mas de dos caracteres");
        }
        if (form.email.value == "") {
            errors.push("Tienes que escribir un correo");
        } 
        if (form.password.value == "") {
            errors.push("Tienes que escribir una contraseña");
        } if (form.password.value.length < 8) {
            errors.push("Debe ingresar una contraseña que contenga mas de 8 caracteres")
        }

        if (errors.length > 0) {
            e.preventDefault();
            errors.map((e) => {
                errorsList.innerHTML += "<li>" + e + "</li>";
            });
            errorsList.style.display = "block";
        }
    })
}