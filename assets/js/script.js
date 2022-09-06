//Consumindo API de CEP com Javascript puro por meio do fetch API;
const getElementsViaId = (element, value) => {
    const idWithValue = document.getElementById(element).value;
    const idWithoutValue = document.getElementById(element);

    const IsItWorthitOrNot = value ? idWithValue : idWithoutValue;

    return IsItWorthitOrNot;
};

const clearField = () => {
    const input = document.querySelectorAll(".form input");

    input.forEach((input) => {
        input.value = "";
    });
};

const OnlyNumbers = (e) => {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
};

const time = () => {
    setTimeout(() => {
        clearField();
    }, 2000);
};

const showAddress = (data) => {
    const cep = (getElementsViaId("cep").value = data.cep);
    const rua = (getElementsViaId("rua").value = data.logradouro);
    const bairro = (getElementsViaId("bairro").value = data.bairro);
    const cidade = (getElementsViaId("cidade").value = data.localidade);
    const estado = (getElementsViaId("uf").value = data.uf);
};

//fetch api with async and await;
const consultAddress = async () => {
    const cep = getElementsViaId("cep", "value");
    const url = `https://viacep.com.br/ws/${cep}/json`;

    if (cep.length !== 8 || cep == "") {
        clearField();
        const rua = (getElementsViaId("rua").value = "CEP incorreto");
        time();
    } else {
        const dataApi = await fetch(url);
        const data = await dataApi.json();

        if (data.erro) {
            clearField();
            const rua = (getElementsViaId("rua").value = "CEP não encontrado");
            time();
        } else {
            showAddress(data);
        }
    }

    //Sem utilizar o async e await;
    // fetch(url).then((response) => {
    //    response.json().then((data) => {
    //         // showAddress(data);
    //     });
    //  });
};

cep.addEventListener("focusout", consultAddress);
