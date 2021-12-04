import { ownerId } from "../api/data-storage.js";
import { deleteFurnitureById, getFurnitureDetails } from "../api/data.js";
import { html, until } from "../library.js";

const detailsTemplate = (dataPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
${until(dataPromise, html `<div class="row space-top">Loading &hellip;</div>`)}
        `;
const productTemplate = (product, onDelete) => html`
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${product._id}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${product.make}</span></p>
        <p>Model: <span>${product.model}</span></p>
        <p>Year: <span>${product.year}</span></p>
        <p>Description: <span>${product.description}</span></p>
        <p>Price: <span>${product.price}</span></p>
        <p>Material: <span>${product.material}</span></p>
        ${ownerId == product._ownerId ? html` <div>
            <a href="/edit/${product._id}" class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
        </div>`: null};
    </div>
</div>`

export function detailsPage(context) {
    const productId = context.params.id
    context.render(detailsTemplate(loadFurnitureData(productId, context)))
}
async function loadFurnitureData(id, context) {
    const product = await getFurnitureDetails(id)

    return productTemplate(product, onDelete);

    async function onDelete() {
        const choice = confirm ("Are you sure you want to delete product?")
        if (choice){
            await deleteFurnitureById(id)
            context.page.redirect('/')
        }
    }
}

