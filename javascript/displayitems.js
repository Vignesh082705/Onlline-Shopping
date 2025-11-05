function displayItems(filter_id)
{
    let cvalue = getCookie("Username");
    if (cvalue !== null && cvalue !== "") {
        let finalData = localStorage.getItem("final")
        if (finalData !== null) {
            document.getElementById("flexOutput").innerHTML = finalData
        }
    }
	fetch("data/myProducts.json").then((response)=>
		response.json()
		).then((myObject)=>
		{

          
		for(let k in myObject)
		{
			if(myObject[k].filter_id===filter_id)
			{
					let arr=myObject[k].products
					let productHTML=""
					for(let j in arr)
					{
					productHTML+=displayProduct(arr[j])
                    
					}
					let myRow=document.querySelectorAll(".myRow")
					for(let o in myRow)
					{
						myRow[o].innerHTML=""	
					}
					document.querySelectorAll(".myRow")[0].innerHTML=productHTML
                    document.querySelectorAll(".myRow")[0].style.display="flex"
					document.querySelectorAll(".myRow")[0].style.flexDirection="row"
					document.querySelectorAll(".myRow")[0].style.justifyContent="space-around"
					document.querySelectorAll(".myRow")[0].style.alignContent="space-around"
					document.querySelectorAll(".myRow")[0].style.flexWrap="wrap"
					document.querySelectorAll(".myRow")[0].style.padding="10px"
					document.querySelectorAll(".myRow")[0].style.paddingTop="0px"
                    document.querySelectorAll(".myRow")[0].style.height="630px"
                    let myBlocks=document.querySelectorAll(".myRow div")
					for(let i in myBlocks)
					{
						if(!(String(myBlocks[i].innerHTML)==="undefined")&&!(String(myBlocks[i].innerHTML)===""))
						{	
						myBlocks[i].style.width="300px"
						myBlocks[i].style.height="300px"
						myBlocks[i].style.textAlign="center"
						myBlocks[i].style.borderRadius="3%"
						myBlocks[i].style.border="2px solid black"
						myBlocks[i].style.marginTop="10px"
						}						
					}
					let myImages=document.querySelectorAll(".myRow img")
					for(let m in myImages)
					{
						if(!(String(myImages[m].innerHTML)==="undefined")&&(typeof(myImages[m])==="object"))
						{   
						myImages[m].style.width="180px"	
						myImages[m].style.height="180px"
						myImages[m].style.objectFit="cover"
						}
					}
					let mySpan=document.querySelectorAll(".myRow span")
					for(let n in mySpan)
					{
					if(!(String(mySpan[n].innerHTML)==="undefined")&&(typeof(mySpan[n])==="object"))
					{
					mySpan[n].style.float="left"
					mySpan[n].style.color="red"
					mySpan[n].style.margin="6px auto auto 10px"
					}
					}
					let myCartButton=document.querySelectorAll(".myRow button")
					for(let j in myCartButton)
					{
					if(!(String(myCartButton[j].innerHTML)==="undefined")&&(typeof(myCartButton[j])==="object"))
						{
						myCartButton[j].style.borderRadius="20px"
						myCartButton[j].style.margin="auto 10px auto auto"
						}
					}
                }	
		}
	})
}

function displayProduct(product)
{
	
	return `<div id="p${product.product_id}">
	<H2>${product.product_name}</H2>
	<img src="${product.imgSrc}">
	<br>
	<HR style="margin-bottom:10px;">
	<span>₹${product.price}</span><button class="float-right btn btn-info" onclick="addToCart(${product.product_id},'${product.product_name}','${product.imgSrc}',${product.price})">Add-to-cart</button></div>`
	
}


function setCookie(cname,cvalue)
{
	let myCookie=cname+"="+cvalue
	let d=new Date()
	d.setMinutes(d.getMinutes()+2)
	document.cookie=myCookie+";expires="+d.toUTCString()+";path=/"
}

function getCookie(cname)
{
	let myCookie=cname+"="
	let allCookies=decodeURIComponent(document.cookie)
	let cookieArray=allCookies.split(";")
	for(let k=0;k<cookieArray.length;k++)
	{
	  if(cookieArray[k].indexOf(myCookie)!=-1)
	  {
		let cvalue=cookieArray[k].substring(cookieArray[k].indexOf("=")+1)
		if(cvalue==="")
		{
				continue
		}
		else
		{
			return cvalue
		}
	  }		
	}
	return ""
}

function addToCart(product_id, product_name, imgsrc, price) {
    let myuser = getCookie("Username");
    if (myuser !== "" && myuser !== null) {
        let productsString = localStorage.getItem("productsArray");

        if (productsString === null || productsString === "") {
            productsString = "";
        }

        let prodArr = productsString.split(",");

        if(prodArr.indexOf(String(product_id))!=-1)
        {
            alert("product Already in cart")
        }
        else{

        productsString+=","+product_id
        
        let newDiv=document.createElement("div")
	
        newDiv.id=product_id
        newDiv.className="new"
        let productNameLabel=document.createElement("label")
        let productLabelText=document.createTextNode("Product Name:")
        productNameLabel.appendChild(productLabelText)
        
        newDiv.appendChild(productNameLabel)
        
        let nameSpan=document.createElement("span")
        let nameText=document.createTextNode(product_name)
        nameSpan.appendChild(nameText)
        nameSpan.style.marginLeft="20px"
        newDiv.appendChild(nameSpan)
        
        let myBr=document.createElement("br")
        newDiv.appendChild(myBr)
        
        let quantityLabel=document.createElement("label")
        let quanLabelText=document.createTextNode("Quantity:")
        quantityLabel.setAttribute("data-qty", quanLabelText);
        quantityLabel.appendChild(quanLabelText)
        newDiv.appendChild(quantityLabel)
        
        localStorage.setItem("productsArray",productsString)
        let currentHTML=newDiv.innerHTML
        let inputHTML=`<input style="margin-left:10px;text-align:center;" type="number"  id="i${product_id}" value="1" onchange="populateQuantity()">`
        currentHTML+=inputHTML
        newDiv.innerHTML=currentHTML
        
        let myBr2=document.createElement("br")
        newDiv.appendChild(myBr2)
        
        let priceLabel=document.createElement("label")
        let priceText=document.createTextNode("Price:")
        priceLabel.appendChild(priceText)
        
        newDiv.appendChild(priceLabel)
        let priceSpan=document.createElement("span")
        let priceSpanText=document.createTextNode(`₹${price}`)
        priceSpan.id = "price" + product_id;  
        priceSpan.setAttribute("data-baseprice", price); 
        priceSpan.style.marginLeft="90px"
        priceSpan.appendChild(priceSpanText)
        newDiv.appendChild(priceSpan)

        
        let myBr3=document.createElement("br")
        newDiv.appendChild(myBr3)
        let myHr=document.createElement("hr")
        newDiv.appendChild(myHr)
        
        let hiddenImg = document.createElement("img");
        hiddenImg.src = imgsrc;
        hiddenImg.style.display = "none";
        hiddenImg.id = "img" + product_id;
        newDiv.appendChild(hiddenImg);

        let newDivInnerHTML=newDiv.innerHTML
        let myDelButton=`<button class="badge badge-pill badge-danger" style="padding:10px;" onclick="removeItem(${product_id})"><i class="bi bi-trash3-fill"></i></button>`
        newDivInnerHTML+=myDelButton
        newDiv.innerHTML=newDivInnerHTML
        let myContainer = document.getElementById("flexContainer");

        if (!myContainer) {
            let username = getCookie("Username");

            let html = `
                <div id="flexContainer">
                    <h2>Welcome, ${username}</h2>

                    <div id="buttons" style="background-color:none;background-image:none; border:none;">
                        <button class="btn btn-danger" style="float:left;margin-left:10px;" onclick="clearCart()">Clear Cart</button>
                        <button class="btn btn-success" style="float:right;margin-right:10px;" onclick="checkOut()">Check-Out</button>
                    </div>
                </div>
            `;

            document.getElementById("flexOutput").innerHTML = html;
        }

        myContainer = document.getElementById("flexContainer");
        let myButtons = document.getElementById("buttons");

        myContainer.insertBefore(newDiv, myButtons);
        
        let flexOutput=document.getElementById("flexOutput")
        localStorage.setItem("final",flexOutput.innerHTML)
        }   
    } 
    else {

        let myuser = prompt("Enter Username:");

        if (myuser !== null && myuser !== "") {
            setCookie("Username", myuser);
            let productsArray=product_id
            localStorage.setItem("productsArray",productsArray)

            let returnDiv = `
            <div id="flexContainer">
                <h2>Welcome, ${myuser}</h2>

                <div class="new" id="${product_id}">
                    <label>Product Name:</label>
                    <span style="margin-left:20px;">${product_name}</span><br>

                    <label>Quantity:</label>
                    <input style="margin-left:10px;text-align:center;" 
                           type="number" id="i${product_id}" value="1" onchange="populateQuantity()"><br>

                    <label>Price:</label>
                    <span id="price${product_id}" style="margin-left:90px;" data-baseprice="${price}">₹${price}</span><br>

                    <hr>
                    <img src="${imgsrc}" id="img${product_id}" style="display:none;">
                    <button class="badge badge-pill badge-danger" style="padding:10px;"
                        onclick="removeItem(${product_id})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </div>

                <div id="buttons" style="background-color:none;background-image:none; border:none;">
                    <button class="btn btn-danger" style="float:left;margin-left:10px;" onclick="clearCart()">Clear Cart</button>
                    <button class="btn btn-success" style="float:right;margin-right:10px;" onclick="checkOut()">Check-Out</button>
                </div>
            </div>`;

            document.getElementById("flexOutput").innerHTML = returnDiv;
            localStorage.setItem("final",returnDiv)
        }
    }
}
function removeItem(product_id) {

    let productsString = localStorage.getItem("productsArray");
    if (!productsString) return;

    let prodArr = productsString.split(",").filter(p => p !== "");

    let index = prodArr.indexOf(String(product_id));
    if (index !== -1) {
        prodArr.splice(index, 1);
    }

    localStorage.setItem("productsArray", prodArr.join(","));

    let parentDiv = document.getElementById("flexContainer");
    let childDiv = document.getElementById(product_id);

    if (parentDiv && childDiv) {
        parentDiv.removeChild(childDiv);
    }

    if (prodArr.length === 0) {
        document.getElementById("flexOutput").innerHTML = "";
        localStorage.removeItem("final");
        return;
    }

    let flexOutput = document.getElementById("flexOutput");
    localStorage.setItem("final", flexOutput.innerHTML);
}

function clearCart() {
    localStorage.removeItem("productsArray");
    localStorage.removeItem("final");

    let container = document.getElementById("flexContainer");

    if (container) {
        let buttons = document.getElementById("buttons");
        container.innerHTML = "";

        let myuser = getCookie("Username");
        if (myuser !== "") {
            container.innerHTML = `<h2>Welcome, ${myuser}</h2>`;
        }

        if (buttons) {
            container.appendChild(buttons);
        }
    }

    let flexOutput = document.getElementById("flexOutput");
    if (flexOutput) {
        flexOutput.innerHTML = "";
        localStorage.setItem("final", "");
    }
}

 
function populateQuantity() {
    let productsString = localStorage.getItem("productsArray");
    if (!productsString) return;

    let prodArr = productsString.split(",");

    for (let i = 0; i < prodArr.length; i++) {

        if (prodArr[i] === "") continue;

        let pid = prodArr[i];

        let quantityInput = document.getElementById("i" + pid);
        if (!quantityInput) continue;

        let qty = parseInt(quantityInput.value);

        if (qty < 1) {
            qty = 1;
            quantityInput.value = 1;
        }

        quantityInput.setAttribute("value", qty);

        let priceSpan = document.getElementById("price" + pid);
        let basePrice = parseInt(priceSpan.getAttribute("data-baseprice"));

        let newPrice = basePrice * qty;
        priceSpan.textContent = "₹" + newPrice;
    }

    let flexOutput = document.getElementById("flexOutput");
    localStorage.setItem("final", flexOutput.innerHTML);
}

function checkOut() {
    let productsString = localStorage.getItem("productsArray");

    if (!productsString || productsString.trim() === "") {
        alert("Cart is empty!");
        return;
    }

    let prodArr = productsString.split(",");
    let flexOutput = document.getElementById("checkout");

    let checkoutHTML = `
    <div id="checkoutBox" 
        style="
            width:550px;
            padding:15px;
            overflow-y:auto;
            height:650px;
            border-radius:4px;
            position: fixed;
            left:300px;
            top:0px;
            z-index:4;
        ">

        
        <div id="tableWrapper" 
        style="
        max-height:250px;
        background-color:white;
        border-radius:5px;
        overflow-y:auto;
        margin-top:10px;
        padding:5px;
        ">
        <h3 style="text-align:center;">Checkout Summary</h3>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr style="background:#f5f5f5;"> 
                        <th style="padding:10px; border:1px solid #ccc;">Product</th> 
                        <th style="padding:10px; border:1px solid #ccc;">Image</th> 
                        <th style="padding:10px; border:1px solid #ccc;">Quantity</th> 
                        <th style="padding:10px; border:1px solid #ccc;">Price</th> 
                        <th style="padding:10px; border:1px solid #ccc;">Total</th> 
                    </tr>
                </thead>
                <tbody>
    `;

    let grandTotal = 0;

    for (let i = 0; i < prodArr.length; i++) {
        let pid = prodArr[i];
        if (pid === "") continue;

        let itemDiv = document.getElementById(pid);
        if (!itemDiv) continue;

        let productName = itemDiv.querySelector("span").innerText;
        let qty = document.getElementById("i" + pid).value;
        let itemTotal = parseInt(document.getElementById("price" + pid).innerText.replace("₹", ""));
        let imgSrc = document.getElementById("img" + pid)?.src || "";

        grandTotal += itemTotal;

        checkoutHTML += `
            <tr> 
                <td style="padding:10px; border:1px solid #ccc;">${productName}</td> 
                <td style="padding:10px; border:1px solid #ccc;"> 
                <img src="${imgSrc}" style="width:60px; height:60px; object-fit:cover;"> 
                </td> <td style="padding:10px; border:1px solid #ccc;">${qty}</td> 
                <td style="padding:10px; border:1px solid #ccc;">₹${itemTotal / qty}</td> 
                <td style="padding:10px; border:1px solid #ccc;">₹${itemTotal}</td> 
            </tr>
        `;
    }

    checkoutHTML += `
    <tr style="background:#f0f0f0; font-weight:bold;"> 
        <td colspan="4" style="padding:10px; border:1px solid #ccc; text-align:center;"> Grand Total: </td> 
        <td style="padding:10px; border:1px solid #ccc;"> ₹${grandTotal} </td> 
    </tr>
            </tbody>
        </table>
        </div>

        <div style="display:flex; justify-content:space-between; margin-top:15px;">
            <button class="btn btn-secondary" onclick="closeCheckout()">Back</button>
            <button class="btn btn-success" onclick="openPayment(${grandTotal})">Proceed to Pay</button>
        </div>

        <div id="paymentBox"
            style="
                background:#f9f9f9;
                border-radius:10px;
                margin-top:15px;

                max-height:0px;
                overflow:hidden;
                transition: max-height 1.5s ease-in-out;
            ">
        </div>

    </div>
    `;

    flexOutput.innerHTML = checkoutHTML;
}


function closeCheckout() {
    document.getElementById("checkout").innerHTML = "";
}

function openPayment(total) {
    let box = document.getElementById("paymentBox");

    box.innerHTML =`
    <h3 style="text-align:center;">Payment Details</h3>
    <p style="text-align:center; font-size:16px;">Grand Total: <b>₹${total}</b></p>

        <div style="
        display:flex;
        justify-content:center;
        gap:20px;
        flex-wrap:wrap;
        margin-bottom:15px;
        ">
            <img src="https://img.icons8.com/color/48/visa.png" width="45">
            <img src="https://img.icons8.com/color/48/mastercard.png" width="45">
            <img src="https://img.icons8.com/color/48/google-pay.png" width="45">
        </div>


    <div class="payment-row">
        <div class="payment-col">
            <label>Account Number:</label>
            <div class="acc-row">
                <input type="text" maxlength="4" class="acc" id="acc1">
                <input type="text" maxlength="4" class="acc" id="acc2">
                <input type="text" maxlength="4" class="acc" id="acc3">
                <input type="text" maxlength="4" class="acc" id="acc4">
            </div>
        </div>

        <div class="payment-col">
            <label>CV Code:</label>
            <input type="password" placeholder="Enter password">
        </div>
    </div>
    <button style="text-align:center;" class="pay-btn">Pay Now</button>`;

    box.style.maxHeight = "500px";
    box.style.padding="15px";
    box.style.marginBottom="15px";
    box.style.border="1px solid black"
}