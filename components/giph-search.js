import { LitElement, html, css } from 'lit';

class GiphySearch extends LitElement {
    static properties = {
        gifs: { type: Array },
        query: { type: String }
    };

    constructor() {
        super();
        this.gifs = [];
        this.query = 'rick y morty'; // Valor por defecto de la búsqueda
    }

    static styles = css`
    .gif-container {
      display: flex;
      flex-wrap: wrap;
    }
    .gif {
      margin: 10px;
    }
  `;

    connectedCallback() {
        super.connectedCallback();
        this.fetchGifs();
    }

    async fetchGifs() {
        const apiKey = 'YTgNqi2FQyjX1BFx6fHtu4gRRhGpmkY1';
        const limit = 10; // Puedes cambiar el límite si lo deseas
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(this.query)}&limit=${limit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            this.gifs = data.data; // Guardamos los GIFs en la propiedad gifs
        } catch (error) {
            console.error('Error al consultar la API:', error);
        }
    }

    render() {
        return html`
      <div class="gif-container">
        ${this.gifs.map(
            gif => html`
            <div class="gif">
              <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
            </div>
          `
        )}
      </div>
    `;
    }
}

customElements.define('giphy-search', GiphySearch);
