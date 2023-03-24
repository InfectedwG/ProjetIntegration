let panierBTN = document.getElementById('panier-btn');

panierBTN.addEventListener('click', async (event) => {
    await fetch('/panier', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
});