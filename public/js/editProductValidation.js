window.onload = function () {
    let formulario = document.querySelector('.form-user');

    formulario.addEventListener('submit', (e) => {
        let errors = [];

        let category = document.getElementById("category");
        let brand = document.querySelector("brand");
        let model = document.querySelector("model");
        let price = document.querySelector("price");
        let image = document.querySelector("imagen");
        let description = document.querySelector("description");


        if (category.value == '') {
            errors.push('El campo "Categoría" está vacío');
            category.classList.add('is-invalid');
        } else {
            category.classList.add('is-valid');
            category.classList.remove('is-invalid');
            formulario.category.focus();
        }

        if (brand.value == "") {
            errors.push('El campo "Marca" está vacío');
            brand.classList.add("is-invalid");
        } else {
            brand.classList.add("is-valid");
            brand.classList.remove("is-invalid");
            formulario.brand.focus();
        }

        if (model.value == "") {
            errors.push('El campo "Modelo" está vacío');
            model.classList.add("is-invalid");
        } else {
            model.classList.add("is-valid");
            model.classList.remove("is-invalid");
            formulario.model.focus();
        }
        if (price.value == "") {
            errors.push('El campo "Precio" está vacío');
            price.classList.add("is-invalid");
        } else {
            price.classList.add("is-valid");
            price.classList.remove("is-invalid");
            formulario.precio.focus();
        }

        if (image.value == "") {
            errors.push('El campo "imagen" está vacío');
            image.classList.add("is-invalid");
        } else {
            image.classList.add("is-valid");
            image.classList.remove("is-invalid");
            formulario.image.focus();
        }

        if (description.value == '') {
            errors.push('El campo "Descripción" está vacío');
            description.classList.add('is-invalid');
        } else {
            description.classList.add('is-valid');
            description.classList.remove('is-invalid')
            formulario.description.focus();
        }

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        } else {
            // alert('La validación fué exitosa')
            formulario.submit();
        }
    })
}