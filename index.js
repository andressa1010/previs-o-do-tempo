const chaveDoApi = "cd31863ae267407cb01212131232011";
const botaoDeBusca = document.querySelector(".btn-busca");
const selectMainContainer = document.querySelector("#container");

setInterval(() => {
    getHours()
}, 1000);

const getHours = () => {
    const selectClock = document.getElementById("hora");
    const selectData = document.getElementById("data");
    const date = new Date();
    const year = date.getFullYear();
    const months = date.getMonth()+1;
    const days = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hour = hours < 10 ? `0${hours}` : hours;
    const minute = minutes < 10 ? `0${minutes}` : minutes;
    const second = seconds < 10 ? `0${seconds}` : seconds;
    const month = months < 10 ? `0${months}` : months;
    const day = days < 10 ? `0${days}` : days;
    selectClock.innerHTML = `${hour}:${minute}:${second}`;
    selectData.innerHTML = `${day}/${month}/${year}`;

    if (hour <= 5) {
        selectMainContainer.style.backgroundImage = "url(./src/imagens/background-0.png)";
    } else if (hour >= 6 && hour <= 11) {
        selectMainContainer.style.backgroundImage = "url(./src/imagens/background-1.png)";
    } if (hour >= 12 && hour <= 17) {
        selectMainContainer.style.backgroundImage = "url(./src/imagens/background-2.png)"
    } else if (hour >= 18 && hour <= 23) {
        selectMainContainer.style.backgroundImage = "url(./src/imagens/background-3.png)"
    };
};

botaoDeBusca.addEventListener("click", async () => {
    const cidade = document.getElementById("input-busca").value;

    if (!cidade) return;

    const dados = await buscarDadosDaCidade(cidade);

    if (dados) peencherDadosNaTela(dados, cidade);

    document.getElementById("input-busca").value = "";
    document.getElementById("input-busca").focus();
});

document.getElementById("input-busca").addEventListener("keyup", async (e) => {
    const cidade = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterKeyPressed = key === 13;

    if (isEnterKeyPressed) {

        if (cidade == "") return;

        const dados = await buscarDadosDaCidade(cidade);

        if (dados) peencherDadosNaTela(dados, cidade);

        document.getElementById("input-busca").value = "";
        document.getElementById("input-busca").focus();
    };
});

async function buscarDadosDaCidade(cidade) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${chaveDoApi}&q=${cidade}&aqi=no&lang=pt`;
    const response = await fetch(apiUrl);

    if (response.status !== 200) return;

    const dados = response.json();

    return dados;
};

function peencherDadosNaTela(dados, cidade) {
    const regiaoEstado = dados.location.region;
    const tempetatura = dados.current.temp_c;
    const condicao = dados.current.condition.text;
    const humidade = dados.current.humidity;
    const velocidadeDoVento = dados.current.wind_kph;
    const iconeCondicao = dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidade;
    document.getElementById("estado").textContent = regiaoEstado;
    document.getElementById("temperatura").textContent = `${tempetatura} °C`;
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("humidade").textContent = `${humidade}%`;
    document.getElementById("velocidade-do-vento").textContent = `${velocidadeDoVento}km/h`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao);
};
