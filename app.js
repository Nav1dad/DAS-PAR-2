var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    codigo = document.getElementById("codigo"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    depar = document.getElementById("depar"),
    ndui = document.getElementById("ndui"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser"),
    searchBtn = document.getElementById("searchBtn"),
    searchCode = document.getElementById("searchCode");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Guardar';
    modalTitle.innerText = "Informacion";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function() {
    if (file.files[0].size < 1000000) {  
        var fileReader = new FileReader();

        fileReader.onload = function(e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("Imagen muy pesada!");
    }
}

function showInfo(users = getData) {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    users.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeCodigo}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeDepar}</td>
            <td>${element.employeeNdui}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeCodigo}','${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeDepar}', '${element.employeeNdui}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeCodigo}','${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeDepar}', '${element.employeeNdui}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, codigo, name, age, city, depar, ndui, post, sDate) {
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showCodigo').value = codigo,
    document.querySelector("#showName").value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showDepar").value = depar,
    document.querySelector("#showNdui").value = ndui,
    document.querySelector("#showPost").value = post,
    document.querySelector("#showsDate").value = sDate;
}

function editInfo(index, pic, Codigo, name, Age, City, Depar, Ndui, Post, Sdate) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    codigo.value = Codigo;
    userName.value = name;
    age.value = Age;
    city.value = City;
    depar.value = Depar;
    ndui.value = Ndui,
    post.value = Post,
    sDate.value = Sdate;

    submitBtn.innerText = "Actualizar";
    modalTitle.innerText = "Actualizar El Perfil";
}

function deleteInfo(index) {
    if (confirm("Desea eliminar este usuario?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const codigoValue = codigo.value.trim();
    
    // Verificar si el código ya existe
    const existingUser = getData.find(user => user.employeeCodigo === codigoValue);

    if (isEdit) {
        // Si es edición, solo permitimos el mismo código
        if (existingUser && existingUser.employeeCodigo !== getData[editId].employeeCodigo) {
            alert("El código ya existe. No se puede usar.");
            return;
        }
    } else {
        // Si no es edición, prohibir el mismo código
        if (existingUser) {
            alert("El código ya existe. No se puede usar.");
            return;
        }
    }

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeCodigo: codigoValue,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeDepar: depar.value,
        employeeNdui: ndui.value,
        employeePost: post.value,
        startDate: sDate.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Guardar";
    modalTitle.innerHTML = "Informacion";

    showInfo();
    form.reset();
    imgInput.src = "./image/Profile Icon.webp";  
});

/* searchCode.addEventListener('input', () => {
    const codeToSearch = searchCode.value.trim();

    if (codeToSearch === "") {
        // Si el campo está vacío, muestra todos los usuarios
        showInfo();
    } else {
        // Filtra los usuarios que coinciden con el código ingresado
        const filteredUsers = getData.filter(user => user.employeeCodigo.includes(codeToSearch));
        showInfo(filteredUsers);
    }
}); */

// Si quieres mantener el evento del botón, puedes hacerlo así
searchBtn.addEventListener('click', () => {
    const codeToSearch = searchCode.value.trim();
    const foundUser = getData.find(user => user.employeeCodigo === codeToSearch);

    if (foundUser) {
        showInfo([foundUser]); // Muestra solo el usuario encontrado
    } else {
        alert("Este usuario no existe.");
        showInfo(); // Muestra todos los usuarios si no se encuentra
    }
});


