import { getMyFurniture } from "../api/data.js";
import { ownerId } from "../api/data-storage.js";
import { html, until} from "../library.js";

const myTemplate = (productCallback) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
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

export function myPage(context) {
    context.render(myTemplate(loadAllUserProducts()))
}

async function loadAllUserProducts() {
    const allUserProducts = await getMyFurniture(ownerId)

    return allUserProducts.map(singleProductTemplate)
}
