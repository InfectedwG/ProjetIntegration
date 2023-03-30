let btnProduits = document.getElementsByClassName('produits');

const ouvrirProduit = async (event) => {

    let idProduit = parseInt(event.currentTarget.id);

    let data = {
        id_produit: idProduit,
    }

    let queryString = new URLSearchParams(data).toString();

    window.location.href = `/product?${queryString}`;
    
    
}


for(let produit of btnProduits){
    produit.addEventListener('click', ouvrirProduit);
}