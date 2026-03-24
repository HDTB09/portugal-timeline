# 🇵🇹 Guia de Edição: Linha Cronológica de Portugal

Este projeto foi construído para ser simples de editar, utilizando apenas tecnologias web padrão (HTML5, CSS3 e JavaScript). Não precisa de instalar nada para fazer alterações.

## 📁 Estrutura de Ficheiros

- `index.html`: Contém todo o texto, a estrutura da página e os dados da cronologia.
- `style.css`: Controla o design, as cores, os tipos de letra e as animações.
- `script.js`: Gere a interatividade (filtros, pesquisa, lightbox e efeitos de scroll).
- `images/`: Pasta que contém todas as fotografias reais utilizadas.

## 🛠️ Como Editar

### 1. Alterar ou Adicionar Eventos
Abra o ficheiro `index.html` num editor de texto (como o Bloco de Notas, VS Code ou Sublime Text). Procure pela secção `<div id="timeline-content">`. Cada evento está dentro de um bloco como este:

```html
<div class="timeline-item left politica" data-year="1974">
    <div class="timeline-dot"></div>
    <div class="timeline-card">
        <div class="card-date">25 de Abril de 1974</div>
        <div class="card-category politica">Política</div>
        <h3>Título do Evento</h3>
        <p>Descrição detalhada aqui...</p>
    </div>
</div>
```

- **Para mudar o lado**: Altere a classe `left` para `right`.
- **Para mudar a categoria**: Altere a classe `politica` para `catastrofe`, `economia`, `internacional` ou `social`.
- **Para mudar o ano**: Altere o atributo `data-year`.

### 2. Alterar Cores e Design
Abra o ficheiro `style.css`. No topo, encontrará a secção `:root` com as variáveis de cores:

```css
:root {
    --verde: #006600;
    --vermelho: #CC0000;
    --azul-escuro: #1a2a4a;
    /* ... outras cores ... */
}
```
Basta mudar os códigos hexadecimais (ex: `#CC0000`) para as cores que preferir.

### 3. Substituir Imagens
Coloque as suas novas imagens na pasta `images/` e atualize o caminho no `index.html`:
`<img src="images/nome_da_sua_imagem.jpg" alt="Descrição">`

## 🚀 Como Visualizar
Basta abrir o ficheiro `index.html` em qualquer navegador (Chrome, Firefox, Safari, Edge).

---
*Este projeto permite **explorar os dados de forma mais intuitiva**, **compreender melhor as tendências** históricas e **guardar ou partilhar facilmente** o conhecimento sobre a democracia portuguesa.*
