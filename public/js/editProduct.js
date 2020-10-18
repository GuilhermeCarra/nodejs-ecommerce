document.querySelector('#img1').onchange = (e) => checkBox(e);
document.querySelector('#img2').onchange = (e) => checkBox(e);
document.querySelector('#img3').onchange = (e) => checkBox(e);

function checkBox(e) {
    document.querySelector(`input[name="${e.target.id}"]`).checked = true;
    document.querySelector(`input[name="${e.target.id}"]`).value = 'on';
}
