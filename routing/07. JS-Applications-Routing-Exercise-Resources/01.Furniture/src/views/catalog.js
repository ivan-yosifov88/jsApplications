import { getAllFurniture } from "../api/data.js";
import { html, until } from "../library.js";

const catalogTemplate = (productCallback) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${until(productCallback, html`<p>Loading &hellip;</p>`)}
</div>`;

const singleProductTemplate = (product) => html`
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src="${product.img}" />
            <p>${product.description}</p>
            <footer>
                <p>Price: <span>${product.price} $</span></p>
            </footer>
            <div>
                <a href="/details/${product._id}"class="btn btn-info">Details</a>
            </div>
        </div>
    </div>
</div>`;

export function catalogPage(context) {
    context.render(catalogTemplate(loadProducts()))
}

async function loadProducts() {
    const products = await getAllFurniture();

    return products.map(singleProductTemplate);
}