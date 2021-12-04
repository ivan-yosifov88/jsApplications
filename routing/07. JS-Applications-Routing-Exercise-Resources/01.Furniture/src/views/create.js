import { createFurniture } from "../api/data.js";
import { html } from "../library.js";

const createTemplate = (onSubmit, errorMessage) => html`
<div class="row space-top">
<div class="col-md-12">
    <h1>Create New Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onSubmit}>
${errorMessage ? html `<div class="col-md-4 error">${errorMessage}!</div>` : null}
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class="form-control valid" id="new-make" type="text" name="make">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class="form-control" id="new-model" type="text" name="model">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class="form-control" id="new-year" type="number" name="year">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class="form-control" id="new-description" type="text" name="description">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class="form-control" id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class="form-control" id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
</div>
</form>`;

export function createPage(context) {
    update()
    
    function update(errorMessage) {
        context.render(createTemplate(onSubmit, errorMessage));
    };

    async function onSubmit(event){

        event.preventDefault();
        const form = new FormData(event.target);
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
            await createFurniture(productData)
            event.target.reset()
            context.page.redirect('/')
        } catch (error) {
            update(typeof error == 'object' ? error.message : error)
        }
    }
}
