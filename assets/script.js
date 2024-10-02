/* Variaveís iniciais */
let dollar = 0
let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

/* Adiciona os ventos de keyup e blur aos inputs */
usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
});

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
});

usdInput.addEventListener("blur", () => {
    usdInput.value = formatCurrency(usdInput.value)
});

brlInput.addEventListener("blur", () => {
    brlInput.value = formatCurrency(brlInput.value)
});

/* obtem a cotação atual do dollar fazendo uma requisição á API */
getExchangeRate().then(rate => {
    if (rate) {
        dollar = rate;
        usdInput.value = formatCurrency("1000"); //preenche com o valor padrão
        convert("usd-to-brl"); // faz a conversão pra BRL
    }
});

/* FUNÇÕES */

/* FUNÇÃO PARA FORMATAR O VALOR EM FORMATO DE MOEDA BRL */
function formatCurrency(value) {
    let fixedValue = fixValue(value);
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    };
    let formatter = new Intl.NumberFormat("pt-BR", options)
    return formatter.format(fixedValue);
}


/* FUNÇÃO PARA CORRIGIR O VALOR, TRANSFORMANDO A VIRGULA EM PONTO E TRANSFORMANDO EM PONTO */
function fixValue(value) {
    let fixedValue = value.replace(",", ".");
    let floatValue = parseFloat(fixedValue);
    if (isNaN(floatValue)) {
        floatValue = 0
    }
    return floatValue
}

/* FUNÇÃO PARA REALIZAR A CONVERÇÃO ENTRE USD E BRL */
function convert(type) {
    if (dollar === 0) {
        console.log("Cotação ainda não carregada.");
        return;
    }

    if (type === "usd-to-brl") {
        let fixedValue = fixValue(usdInput.value);

        let result = fixedValue * dollar;
        result = result.toFixed(2);

        brlInput.value = formatCurrency(result);
    }

    if (type === "brl-to-usd") {
        let fixedValue = fixValue(brlInput.value);

        let result = fixedValue / dollar;
        result = result.toFixed(2);

        usdInput.value = formatCurrency(result);
    }
}

/* Função para obter a cotação atual do dólar usando a API */
async function getExchangeRate() {
    const API_URL = `http://localhost:3000/exchange-rate`;


    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Erro ao obter cotação");
        }
        const data = await response.json();
        return data.conversion_rates.BRL; //Retorna a cotação atual do dólar para Real
    } catch(error) {
        console.log(error);
    }
}