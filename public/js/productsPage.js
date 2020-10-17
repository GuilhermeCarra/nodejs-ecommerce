// Updating active link on navbar
document.querySelector('.active').classList.remove('active');
document.querySelector('a[href="/hamburguers"]').classList.add('active');

// Load more productc buttons (pagination)
document.querySelector('#loadBtn').addEventListener('click', (e) => {
    let page = parseInt(e.target.dataset.page);
    let loadPage = new Request(`/ajax/loadPage?page=${page}`, {method: 'GET'});
    fetch(loadPage)
        .then(response => response.text())
        .then(data => {
            if (!data.includes('false')) {
                let parser = new DOMParser();
                let append = parser.parseFromString(data, 'text/html');
                for (let child of append.body.childNodes) {
                    document.querySelector('#productsList').appendChild(child);
                }
                e.target.dataset.page = page + 1;
            } else {
                e.target.innerText = 'No more products 😔'
            }
    });
});