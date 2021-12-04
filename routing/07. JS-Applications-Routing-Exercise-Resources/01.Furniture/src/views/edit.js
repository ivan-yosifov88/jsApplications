import { getFurnitureDetails, updateFurnitureList } from "../api/data.js";
import { html, until } from "../library.js";

const editTemplate = (editPromise) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
    ${until(editPromise, html`<div class="row space-top">Loading &hellip;</div>`)}
</div>
`;
const formTemplate = (product, onSubmit, errorMessage) => html`
<form @submit=${onSubmit}>
    ${errorMessage ? html`<div class="row space-top error">${errorMessage}</div>` : null}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control" id="new-make" type="text" name="make" .value="${product.make}">
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control" id="new-model" type="text" name="model" .value="${product.model}">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control" id="new-year" type="number" name="year" .value="${product.year}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control" id="new-description" type="text" name="description"
                    .value="${product.description}">
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control" id="new-price" type="number" name="price" .value="${product.price}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control" id="new-image" type="text" name="img" .value="${product.img}">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value="${product.material}">
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;


export function editPage(context) {
    const productId = context.params.id;
    const productPromise = getFurnitureDetails(productId)
    update(productPromise)

    function update(productPromise, errorMessage) {
        context.render(editTemplate(loadProductData(productPromise)));

        async function loadProductData(productPromise) {
            const product = await productPromise;
        
            return formTemplate(product, onSubmit, errorMessage)
        }

        async function onSubmit(event) {

            event.preventDefault();
            const form = new FormData(event.target);
            const data = [...form].reduce((a, [k, v]) => Object.assign(a, { [k]: v.trim()}), {});
            const make = form.get('make').trim();
            const model = form.get('model').trim();
            const year = form.get('year').trim();
            const description = form.get('description').trim();
            const price = form.get('price').trim();
            const img = form.get('img').trim();
            const material = form.get('material').trim();

            try {
                if (make.length < 4 || model.length < 4) {
                    throw new Error('Make and Model must be at least 4 symbols long');
                }
                if (1950 > Number(year) || Number(year) > 2050) {
                    throw new Error('Year must be between 1950 and 2050');
                }
                if (description.length <= 10) {
                    throw new Error('Description must be more than 10 symbols');
                }
                if (price == '' || Number(price) < 0) {
                    throw new Error('Price must be a positive number');
                }
                if (img == '') {
                    throw new Error('Image URL is required');
                }

                const productData = {
                    make,
                    model,
                    year: Number(year),
                    description,
                    price: Number(price),
                    img,
                    material
                }
                await updateFurnitureList(productId, productData)
                event.target.reset();
                context.page.redirect('/');
            } catch (error) {
                update(data, typeof error == 'object' ? error.message : error)
            }
        }
    }
}


// const data = formData.reduce((a, [k, v])) => Object.assign(a, { [k]: v.trim()}), {});