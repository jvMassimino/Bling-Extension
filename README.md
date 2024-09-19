# Bling Extension - Calculadora de Peso Cubado

Esta extensão foi criada para automatizar o cálculo do peso cubado dos produtos cadastrados no [Bling](https://www.bling.com.br), facilitando uma tarefa repetitiva que antes era feita manualmente.

O **peso cubado** é uma medida importante usada por transportadoras para calcular o custo de envio de um produto com base em suas dimensões físicas. Com esta extensão, você pode obter o peso cubado diretamente da página do produto no Bling, economizando tempo e minimizando erros.

## Como funciona

O script extrai as medidas cadastradas para o produto diretamente da página e realiza o cálculo do peso cubado de acordo com a seguinte fórmula:

Peso Cubado = (Altura * Comprimento * Largura) / 6000

O divisor **6000** representa o coeficiente para converter o volume em centímetros cúbicos para quilogramas. Esse coeficiente pode variar de acordo com a transportadora, mas atende bem a padrões amplamente usados por empresas como Correios, Jadlog e Mercado Envios.

### Observações:
- O cálculo sempre utiliza a maior medida entre o peso real do produto e o peso cubado, garantindo que o valor mais adequado seja utilizado para envio.
- A extensão é compatível com produtos cadastrados no Bling que utilizam **centímetros** como unidade de medida.

## Instalação

1. Clone este repositório ou baixe os arquivos:
   ```bash
   git clone https://github.com/jvmassimino/Bling-Extension.git


Abra o Gerenciador de Extensões no Google Chrome.

Ative o modo desenvolvedor.

Clique em Carregar sem compactação e selecione a pasta onde estão os arquivos da extensão.

A extensão estará pronta para uso diretamente na página de produtos do Bling.

## Como usar

Abra a página de um produto no Bling.

A extensão automaticamente calculará o peso cubado com base nas medidas cadastradas (altura, comprimento e largura).

Se as medidas não estiverem em centímetros, a extensão emitirá um alerta para revisão das unidades de medida.

## Contribuição

Sinta-se à vontade para abrir um issue caso encontre bugs ou tenha sugestões de melhoria. Pull requests também são bem-vindos!

## Licença
Este projeto está licenciado sob a [MIT License](https://github.com/jvMassimino/Bling-Extension/blob/main/LICENSE)

## Print

![image](https://github.com/user-attachments/assets/a97c4b38-641a-47e1-9d8f-233decdf1423)
