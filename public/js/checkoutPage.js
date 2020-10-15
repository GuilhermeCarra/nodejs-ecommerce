// Updating active link on navbar
document.querySelector('.active').classList.remove('active');
document.querySelector('a[href="/hamburguers"]').classList.add('active');

// Add product
const addButtons = document.querySelectorAll('.bi-caret-right-fill');

for (let addBtn of addButtons) {
    addBtn.addEventListener('click', (e) => {
        const div = e.target.nodeName == 'path' ? e.target.parentNode.parentNode : e.target.parentNode;
        const size = div.dataset.size;
        const id = div.dataset.product;
        const counter = document.querySelector(`#counter-${size}${id}`);
        let quantity = parseInt(counter.textContent);
        var stockCheck = new Request(`/ajax/checkStock?size=${size}&id=${id}`, {method: 'GET'});
        fetch(stockCheck)
            .then(response => response.json())
            .then(data => {
                if(quantity + 1 <= data.stock) {
                    quantity = counter.textContent = quantity +1;
                    updateCart({id: id, size: size, quantity: quantity})
                }
        });
    });
}

// Remove product
const removeButtons = document.querySelectorAll('.bi-caret-left-fill');

for (let removeBtn of removeButtons) {
    removeBtn.addEventListener('click', (e) => {
        const div = e.target.nodeName == 'path' ? e.target.parentNode.parentNode : e.target.parentNode;
        const size = div.dataset.size;
        const id = div.dataset.product;
        const counter = document.querySelector(`#counter-${size}${id}`);
        let quantity = parseInt(counter.textContent);
        if(quantity > 0) {
            quantity = counter.textContent = quantity - 1 ;
            updateCart({id: id, size: size, quantity: quantity})
        }
    });
}

function updateCart(modifiedProduct) {
    // console.log(modifiedProduct)
    var stockCheck = new Request('/ajax/updateCart', {
        headers: { "Content-Type": "application/json" },
        method: 'POST',
        body: JSON.stringify({'updateProduct':modifiedProduct})
    });

    fetch(stockCheck)
        .then(response => response.json())
        .then(data => {
            console.log(data);
    });
}