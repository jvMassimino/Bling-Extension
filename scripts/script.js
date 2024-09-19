(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const urlPattern = /^https:\/\/www\.bling\.com\.br\/produtos\.php#edit\/\d+$/;

    if (!urlPattern.test(tab.url)) {
      showError('Você não está na página correta. Vá até a página de um Produto no', 'https://www.bling.com.br/produtos.php#list');
      return;
    }

    const result = await getProductDimensions(tab.id);
    if (!result || !verificarMedidas(result.unidadeMedida)) {
      showError('Verifique se as medidas estão em centímetros!');
      return;
    }

    displayResults(result);

  } catch (error) {
    console.error('Erro ao obter dimensões do produto:', error);
    showError('Erro ao obter dimensões');
  }
})();

function showError(message, link = false) {
  const titulo = document.querySelector("#titulo");
  const result = document.getElementById('result');
  titulo.textContent = "⚠️ Aviso";
  titulo.style.color = "#d0011b";
  titulo.style.fontSize = "2rem";
  result.textContent = message;

  if (link) {
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.style.margin = "4px";
    linkElement.target = '_blank';
    linkElement.textContent = 'Bling.';
    result.appendChild(linkElement);
  }
};

async function getProductDimensions(tabId) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: extractDimensions,
      },
      (results) => {
        if (results && results[0]) {
          resolve(results[0].result);
        } else {
          resolve(null);
        }
      }
    );
  });
};

async function InjectFunction(tabId, fn) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      {
        target: { tabId },
        function: fn,
      },
      (results) => {
        if (results && results[0]) {
          resolve(results[0].result);
        } else {
          resolve(null);
        }
      }
    );
  });
};

function displayResults(calculatedValue) {
  const result = document.getElementById('result');
  const titulo = document.querySelector("#titulo");

  if (!calculatedValue) {
    showError('Nenhum resultado encontrado');
    return;
  }

  result.textContent = `Peso Cubado: ${calculatedValue.peso}kg`;
  titulo.innerHTML = calculatedValue.produto || "Aguarde a página carregar e tente novamente";
};

function verificarMedidas(unidade) {
  switch (unidade) {
    case 0: // Metros
      return false;
    case 1: // Centímetros
      return true;
    case 2: // Milímetros
      return false;
    default:
      return false;
  }
};

function extractDimensions() {
  try {
    const produtoInput = document.querySelector('input#nome');
    if (!produtoInput) return null;

    const produto = produtoInput.value;
    const unidadeMedida = parseInt(document.querySelector('#unidadeMedida').value);

    const largura = parseFloat(document.getElementById('larguraProduto')?.value) || 0;
    const profundidade = parseFloat(document.getElementById('profundidadeProduto')?.value) || 0;
    const altura = parseFloat(document.getElementById('alturaProduto')?.value) || 0;
    const pesoLiq = parseFloat(document.getElementById('pesoLiq')?.value) || 0;

    const pesoCubado = (largura * profundidade * altura) / 6000;
    const pesoFinal = (pesoLiq && pesoLiq > pesoCubado) ? pesoLiq : pesoCubado;

    return { produto, peso: pesoFinal.toFixed(2), unidadeMedida };
  } catch (error) {
    console.error('Erro ao extrair dimensões:', error);
    return null;
  }
};