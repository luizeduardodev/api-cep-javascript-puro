//Consumindo API de CEP com Javascript puro por meio do fetch API;
const getElementsViaId = (element, value) => {
    const idWithValue = document.getElementById(element).value;
    const idWithoutValue = document.getElementById(element);

    const IsItWorthitOrNot = value ? idWithValue : idWithoutValue;

    return IsItWorthitOrNot;
};

const clearField = () => {
    const cep = (getElementsViaId("cep").value = "");
    const rua = (getElementsViaId("rua").value = "");
    const bairro = (getElementsViaId("bairro").value = "");
    const cidade = (getElementsViaId("cidade").value = "");
    const estado = (getElementsViaId("uf").value = "");
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
}

//fetch api with async and await;
const consultAddress = async () => {
    const cep = getElementsViaId("cep", "value");
    const url = `https://viacep.com.br/ws/${cep}/json`;

    if (cep.length !== 8 || cep == "") {
        clearField();
        alert("CEP inválido");
        return;
    }

    const dataApi = await fetch(url);
    const data = await dataApi.json();
    showAddress(data);

    // fetch(url).then((response) => {
    //    response.json().then((data) => {
    //         // showAddress(data);
    //     });
    //  });
};
cep.addEventListener("focusout", consultAddress);

const showAddress = (data) => {
    const cep = getElementsViaId("cep");
    const rua = getElementsViaId("rua");
    const bairro = getElementsViaId("bairro");
    const cidade = getElementsViaId("cidade");
    const estado = getElementsViaId("uf");

    if (data.erro) {
        //Verificando se teve erro;
        clearField();
        alert("Não foi possível localizar o CEP informado");
    } else {
        cep.value = data.cep;
        rua.value = data.logradouro;
        bairro.value = data.bairro;
        cidade.value = data.localidade;
        estado.value = data.uf;
    }
};