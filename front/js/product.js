// creer une fonction getId (methode newUrlSearchParam)
// creer une fonction fetch + id
// fonction affichage de l'élément (prix couleur etc)
// fonction addEventListener "click" qui va appeler une fonction addCart

// creer fonction addCart
// cette fonction doit :
// -verifier que le localstorage est vide
// -ajouter l'objet avec comme propriétés (id couleur quantité) et l'ajouter au localstorage
// -si le localstorage n'est pas vide (vérifié si le produit n'est pas deja dans le localstorage: soit je modifie la quantité, soit je rajoute le nouveau produit)

//ressource : find (js) runbookdev


// fonction fetch + récupération de l'ID
const fetchData = async () => {
    const newId = new URLSearchParams(window.location.search).get("id");
    console.log(newId)
    try {
        const url = (`http://localhost:3000/api/products/${newId}`)
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            throw new Error(`Error ${response.status}`)
        }
        const data = await response.json();
        console.log(data)
        displayProduct(data);
    } catch (error) {
        alert(error)
    }
};



/**
 * Itère le tableau et créer les éléments
 * @param {Object} product
 */
const displayProduct = (product) => {

    console.log(typeof (product))
    //création éléments DOM et attribution de la data spécifique à chaque élément
    document.getElementById('title').textContent = product.name


    const image = document.createElement('img')
    image.setAttribute('src', product.imageUrl)
    image.setAttribute('alt', product.altTxt)

    document.getElementById('price').textContent = product.price

    document.getElementById('description').textContent = product.description

    const colors = product.colors
    const colorSelect = document.getElementById('colors')
    for (let index in colors) {
        const opt = document.createElement('option')
        opt.textContent = colors[index]
        opt.value = colors[index]
        colorSelect.append(opt)
    }
    insertTagElem(image)
    attachEvent(product._id)
}

/**
 * Insère les éléments dans le DOM
 * @param {Object} image 
 */
const insertTagElem = (image) => {
    const item = document.querySelector('.item__img')
    if (item != null) {
        item.appendChild(image)
    }
}



const attachEvent = (prodID) => {
    document.getElementById('addToCart').addEventListener("click", () => { addCart(prodID) })
}


// fonction qui permet de vérifier et modifier le panier 
const addCart = (prodID) => {
    // verifier qu'un couleur est selectionné
    const selectColor = checkColor()
    // verifier que la quantité est comprise entre 1 et 100 
    const quantity = checkQuantity()
    if (selectColor && quantity) {
        const prod = {
            id: prodID,
            col: selectColor,
            qty: quantity,
        }
        let basket;

        // -verifier que le localstorage est vide
        if (!localStorage.getItem('panier')) {
            // ajouter prod a panier
            basket = []
            basket.push(prod)
        } else {
            // recuperer le localstorage
            // JSON.parse
            basket = JSON.parse(localStorage.getItem('panier'))
            // Verifier le couple (id + color) si c'est le meme, je modifie la quantité
            idColor()
            // sinon je rajoute le produit au local storage
        }
        localStorage.setItem('Panier', JSON.stringify(basket))
    }
    return false
}

const checkColor = () => {
    // si valeur null alert ("vous devez selectionner une couleur") + return false 
    const colorOk = document.getElementsByTagName('option').value
    if (!colorOk) {
        alert("Vous devez séléctionner une couleur")
        return false
    }
    // sinon retourner valeur
    else {
        console.log(colorOk)
        return colorOk
    }
}

const checkQuantity = () => {
    // si valeur null alert ("vous devez selectionner une quantité entre 1 et 100") + return false
    const quantityOk = document.getElementById('quantity').value
    if (!quantityOk) {
        alert("Vous devez séléctionner un quantité comprise entre 1 et 100 inclus")
        return false
    }
    // si value entre 1 et 101 retourner false 
    else if (quantityOk < 0 || quantityOk > 100) {
        return false
    }
    // sinon retourner valeur
    else {
        return quantityOk
    }
}

// const idColor = () => {
//     if () {

//     } else {

//     }
// }


fetchData()
checkColor()
checkQuantity()
