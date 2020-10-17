// Updating active link on navbar
document.querySelector('.active').classList.remove('active');
document.querySelector('a[href="/hamburguers"]').classList.add('active');

// Switch between product images
const thumbnails = document.querySelectorAll('.product-thumbnail');

for (let thumb of thumbnails) {
    thumb.addEventListener('click', (event) => {
        document.querySelector('.card-img').src = event.target.src;
    });
}

// Add product
const addButtons = document.querySelectorAll('.bi-caret-right-fill');

for (let addBtn of addButtons) {
    addBtn.addEventListener('click', (e) => {
        const div = e.target.nodeName == 'path' ? e.target.parentNode.parentNode : e.target.parentNode;
        const size = div.dataset.size;
        const counter = document.querySelector(`#counter-${size}`);
        const id = div.dataset.product;
        const quantity = parseInt(counter.textContent);

        var stockCheck = new Request(`/ajax/checkStock?size=${size}&id=${id}`, {method: 'GET'});
        fetch(stockCheck)
        .then(response => response.json())
        .then(data => {
            if(quantity + 1 <= data.stock) {
                counter.textContent = quantity +1;
            } else {
                const popoverBtn = e.target.nodeName == 'path' ? e.target.parentNode : e.target;
                $(popoverBtn).popover({trigger: 'focus'}).popover('show');
                setTimeout(() => $(popoverBtn).popover('hide'),2200);
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
        const counter = document.querySelector(`#counter-${size}`);
        const quantity = parseInt(counter.textContent);
        if(quantity > 0)  counter.textContent = quantity - 1 ;
    });
}

document.querySelector('#cartAdd').addEventListener('click', () => {
    const id =  document.querySelector('div[data-product]').dataset.product;
    const sizes = document.querySelectorAll('div[data-size]');
    const addToCart = [];
    for (let size of sizes) {
        let quantity = parseInt(document.querySelector('#counter-'+size.dataset.size).textContent);
        if (quantity > 0 ) {
            addToCart.push({'id': id, 'size': size.dataset.size, 'quantity': quantity});
        }
    }
    let options = {
        trigger: 'manual',
        animation: true,
    }

    if (addToCart.length > 0) {
        var stockCheck = new Request('/ajax/addToCart', {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({'addToCart':addToCart})
        });

        fetch(stockCheck)
            .then(() => {
                options.title = 'Great! 🍔';
                options.content = 'Products added to the cart!';
                $('#cartAdd').popover('dispose').popover(options).popover('show');
                setTimeout(() => $('#cartAdd').popover('hide'),2200);
                $('span[id^="counter"]').text('0');
            });
    } else {
        options.title = 'Oops... ❌';
        options.content = 'No product selected';
        $('#cartAdd').popover('dispose').popover(options).popover('show');
        setTimeout(() => $('#cartAdd').popover('hide'),2200);
    }
});