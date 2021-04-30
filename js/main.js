var productName = document.getElementById("pName");
var productCateg = document.getElementById("pCateg");
var productPrice = document.getElementById("pPrice");
var productDesc = document.getElementById("pDesc");
var productSearch = document.getElementById("SearchProducts");
var addProductsBtn = document.getElementById("addProduct");
var allProducts;
var checkCategory, checkName, checkPrice;
var productNameUpdate = document.getElementById("pNameUpdate");
var productCategUpdate = document.getElementById("pCategUpdate");
var productPriceUpdate = document.getElementById("pPriceUpdate");
var productDescUpdate = document.getElementById("pDescUpdate");
var productUpdateBtn = document.getElementById("updateButton");
var closeButton = document.getElementById("close");
var indexCopy;
var updateFormContainer = document.getElementById("updateForm");
var originalFormContainer = document.getElementById("formGroup");

if (localStorage.getItem("productsList") != null) {
    allProducts = JSON.parse(localStorage.getItem("productsList"));

}
else {
    allProducts = [];
}

displayProducts();

productName.addEventListener("keyup", nameInputValidation);

productCateg.addEventListener("keyup", categoryInputValidation);

productPrice.addEventListener("keyup", priceInputValidation);
addProductsBtn.addEventListener("click", addProducts);

productNameUpdate.addEventListener("keyup", nameInputValidationUpdate);

productCategUpdate.addEventListener("keyup", categoryInputValidationUpdate);

productPriceUpdate.addEventListener("keyup", priceInputValidationUpdate);

productUpdateBtn.addEventListener("click", addProductsUpdate);

closeButton.addEventListener("click", closeForm)

productSearch.addEventListener("keyup", function(){searchProduct(this.value)} );

function searchProduct(searchItem)
{
    var trs = "";
    for (var i=0; i<allProducts.length; i++)
    {
        if(searchItem==null)
        {
            displayProducts();
        }
       else if ( allProducts[i].name.toLowerCase().includes( searchItem.toLowerCase()))
        {
            trs += `<tr>
        
            <td>
            ${i}

            </td>
            <td>
            ${allProducts[i].name}
    
            </td>
            <td>
            ${allProducts[i].category}
    
            </td>
            <td>
            ${allProducts[i].price}
    
            </td>
            <td>
            ${allProducts[i].description}
    
            </td>
            <td>
            <button  class=" text-danger btn btn-light btn-outline-primary" onclick="updateProduct(${i})"> update Product</button>
            </td>
            <td>
            <button  class=" text-danger btn btn-light btn-outline-primary "  onclick="deleteProduct(${i})"> delete Product</button>
            </td>
            </tr>
            `
        }

        else
        {
            displayProducts();
        }

        
    }
    document.getElementById("table-body").innerHTML = trs;
}

function closeForm() {
    updateFormContainer.classList.add("display-none");

}

function updateProduct(index) {
    updateFormContainer.classList.remove("display-none");
    updateFormContainer.classList.add("display");
   

    indexCopy = index;


}

function deleteProduct(index) {
    allProducts.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(allProducts));
    displayProducts();

}

function displayProducts() {
    var trs = "";
    for (var i = 0; i < allProducts.length; i++) {
        trs += `<tr>
        
        <td>
        ${i}

        </td>
        <td>
        ${allProducts[i].name}

        </td>
        <td>
        ${allProducts[i].category}

        </td>
        <td>
        ${allProducts[i].price}

        </td>
        <td>
        ${allProducts[i].description}

        </td>
        <td>
        <button  class=" text-danger btn btn-light btn-outline-primary" onclick="updateProduct(${i})"> update Product</button>
        </td>
        <td>
        <button  class=" text-danger btn btn-light btn-outline-primary "  onclick="deleteProduct(${i})"> delete Product</button>
        </td>
        </tr>
        `
    }


    document.getElementById("table-body").innerHTML = trs;

}

function addProducts() {

    nameInputValidation();
    categoryInputValidation();
    priceInputValidation();
    if (checkName && checkPrice && checkCategory) {

        var product = {
            name: productName.value,
            category: productCateg.value,
            price: productPrice.value,
            description: productDesc.value,

        };

        allProducts.push(product);

        localStorage.setItem("productsList", JSON.stringify(allProducts));
        displayProducts();
        clearForm();




    }
}


function addProductsUpdate() {

    nameInputValidationUpdate();
    categoryInputValidationUpdate();
    priceInputValidationUpdate();
    if (checkName && checkPrice && checkCategory) {

        var product = {
            name: productNameUpdate.value,
            category: productCategUpdate.value,
            price: productPriceUpdate.value,
            description: productDescUpdate.value,

        };
        console.log(indexCopy)

        allProducts.splice(indexCopy, 1, product);

        localStorage.setItem("productsList", JSON.stringify(allProducts));
        displayProducts();
        clearForm();
       




    }
}

function clearForm() {
    productName.value = "";
    productCateg.value = "";
    productPrice.value = "";
    productDesc.value = "";


}

function nameInputValidation() {
    var regex = /^[A-Z][a-z]{2,8}$/;
    var x = document.getElementById("alert");
    if (regex.test(productName.value) == false) {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        x.classList.remove("display-none")
        x.classList.add("display");
        checkName = false;
    }
    else if (regex.test(productName.value) == true) {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid");
        x.classList.remove("display");
        x.classList.add("display-none");

        checkName = true;

    }


}


function nameInputValidationUpdate() {
    var regex = /^[A-Z][a-z]{2,8}$/;
    var x = document.getElementById("alertUpdat");
    if (regex.test(productNameUpdate.value) == false) {
        productNameUpdate.classList.remove("is-valid");
        productNameUpdate.classList.add("is-invalid");
        x.classList.remove("display-none")
        x.classList.add("display");
        checkName = false;
    }
    else if (regex.test(productNameUpdate.value) == true) {
        productNameUpdate.classList.remove("is-invalid");
        productNameUpdate.classList.add("is-valid");
        x.classList.remove("display");
        x.classList.add("display-none");

        checkName = true;

    }


}

function priceInputValidationUpdate() {
    var regexnum = /^[1-9][0-9]{1,5}$/;
    var z = document.getElementById("alert-priceUpdate");
    if (regexnum.test(productPriceUpdate.value) == false) {
        productPriceUpdate.classList.remove("is-valid");
        productPriceUpdate.classList.add("is-invalid");
        z.classList.remove("diplay-none")
        z.classList.add("display");
        checkPrice == false;
    }
    else if (regexnum.test(productPriceUpdate.value) == true) {
        productPriceUpdate.classList.remove("is-invalid");
        productPriceUpdate.classList.add("is-valid");
        z.classList.remove("display");
        z.classList.add("display-none");

        checkPrice = true;
    }
}



function priceInputValidation() {
    var regexnum = /^[1-9][0-9]{1,5}$/;
    var z = document.getElementById("alert-price");
    if (regexnum.test(productPrice.value) == false) {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        z.classList.remove("diplay-none")
        z.classList.add("display");
        checkPrice == false;
    }
    else if (regexnum.test(productPrice.value) == true) {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.add("is-valid");
        z.classList.remove("display");
        z.classList.add("display-none");

        checkPrice = true;
    }
}
function categoryInputValidationUpdate() {
    var regex = /^[A-Z][a-z]{2,8}$/;
    var y = document.getElementById("alert-categoryUpdat");
    if (regex.test(productCategUpdate.value) == false) {
        productCategUpdate.classList.remove("is-valid");
        productCategUpdate.classList.add("is-invalid");
        y.classList.remove("diplay-none")
        y.classList.add("display");
        checkCategory = false;

    }
    else if (regex.test(productCategUpdate.value) == true) {
        productCategUpdate.classList.remove("is-invalid");
        productCategUpdate.classList.add("is-valid");
        y.classList.remove("display");
        y.classList.add("display-none");
        checkCategory = true;



    }
}


function categoryInputValidation() {
    var regex = /^[A-Z][a-z]{2,8}$/;
    var y = document.getElementById("alert-category");
    if (regex.test(productCateg.value) == false) {
        productCateg.classList.remove("is-valid");
        productCateg.classList.add("is-invalid");
        y.classList.remove("diplay-none")
        y.classList.add("display");
        checkCategory = false;

    }
    else if (regex.test(productCateg.value) == true) {
        productCateg.classList.remove("is-invalid");
        productCateg.classList.add("is-valid");
        y.classList.remove("display");
        y.classList.add("display-none");
        checkCategory = true;



    }
}
















