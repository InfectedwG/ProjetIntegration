let categorie = document.getElementsByClassName('categorie');



let test = document.getElementById('test');
test.addEventListener('click', () => {
    let categorie = document.getElementsByClassName('categorie');
});


const ouvrirCategory = async (event) => {

    let idCategory = parseInt(event.currentTarget.id);

    let data = {
        id_category: idCategory,
    }

    let queryString = new URLSearchParams(data).toString();

    window.location.href = `/category?${queryString}`;
    
    
}

for (let cat of categorie) {
    cat.addEventListener('click', ouvrirCategory);
}





