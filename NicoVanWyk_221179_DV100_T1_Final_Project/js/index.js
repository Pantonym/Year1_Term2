// Loading the sneaker information into an array
// --Sneaker array variable
var arrSneakers = [];
// --Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();
// --Define the URL of the JSON file
var url = '../json/sneakers.json';
// --Configure the request
xhr.open('GET', url, true);
// --Set the response type
xhr.responseType = 'json';

// --Define a callback function to handle the response
xhr.onload = function () {
    if (xhr.status === 200) {
        // If request is successful, populate arrSneakers with the retrieved data
        arrSneakers = xhr.response;
        // Now you can work with arrSneakers here or call a function to process the data
    } else {
        // Handle errors if the request fails
        console.error('Failed to load sneakers data. Status:', xhr.status);
    }
};

// --Define a callback function to handle errors
xhr.onerror = function () {
    // Handle errors if the request encounters a network error
    console.error('Failed to load sneakers data. Network error occurred.');
};

// --Send the request
xhr.send();

//--Instantiating display array and populating it
var arrDisplay = [];

for (let i = 0; i < arrSneakers.length; i++) {

    arrDisplay.push(arrSneakers[i]);

}

//--Instantiating the object for when a sneaker cannot be found
var objNotFound = {
    Name: "No applicable sneaker",
    Price: -1,
    DaysToClean: -1,
    Rating: -1,
    Description: "No other applicable sneaker could be found with this filter at this time",
    Link: "../Assets/ExampleDesign/Assets/Logo/svg/Logo.svg",
    InCart: false
}

//Functions that are used across all pages
//--Hover effects 
function HoverEnter(HoveredId) {
    document.getElementById(HoveredId).style.filter = "Brightness(50%)";
}

function HoverLeave(HoveredId) {
    document.getElementById(HoveredId).style.filter = "Brightness(100%)";
}

//Home Page
//--Home page startup
function HomeLoad() {

    //----Header
    var iHeaderImg = Math.floor(Math.random() * arrSneakers.length);

    document.getElementById('header-img').src = arrSneakers[iHeaderImg].Link;
    document.getElementById('header-info').innerHTML = arrSneakers[iHeaderImg].Description;

    //----Generating a shorter description
    var sStart = arrSneakers[1].Description;
    let sOutput1 = sStart.substr(0, 160);

    sOutput1 += "...";
    sStart = arrSneakers[2].Description;

    let sOutput2 = sStart.substr(0, 160);
    sOutput2 += "...";

    //----Sliders
    document.getElementById('f-s-rotator1').src = arrSneakers[1].Link;
    document.getElementById('f-s-rotator1-text').innerHTML = sOutput1;
    document.getElementById('f-s-rotator2').src = arrSneakers[2].Link;
    document.getElementById('f-s-rotator2-text').innerHTML = sOutput2;

}

//--Rotator controls
//--Next Image
var iCurrentImgRotator = 1;

function NextImg() {
    //----Increase the counter by one
    iCurrentImgRotator += 1;

    //----Reset the counter if it gets too large
    if (iCurrentImgRotator + 1 == arrSneakers.length) {

        iCurrentImgRotator -= iCurrentImgRotator;

        iCurrentImgRotator += 1;

    }

    //----Generating a shorter description
    var sStart = arrSneakers[iCurrentImgRotator].Description;

    let sOutput1 = sStart.substr(0, 160);
    sOutput1 += "...";

    sStart = arrSneakers[iCurrentImgRotator + 1].Description;

    let sOutput2 = sStart.substr(0, 160);
    sOutput2 += "...";

    //----Sliders
    document.getElementById('f-s-rotator1').src = arrSneakers[iCurrentImgRotator].Link;
    document.getElementById('f-s-rotator1-text').innerHTML = sOutput1;
    document.getElementById('f-s-rotator2').src = arrSneakers[iCurrentImgRotator + 1].Link;
    document.getElementById('f-s-rotator2-text').innerHTML = sOutput2;

}

//--Previous Image
function PreviousImg() {

    //----Decrease counter by one
    iCurrentImgRotator -= 1;

    //----Reset counter if it gets too small
    if (iCurrentImgRotator - 2 == -1 || iCurrentImgRotator - 1 == -1) {
        iCurrentImgRotator = arrSneakers.length - 2;
    }

    //----Generating a shorter description
    var sStart = arrSneakers[iCurrentImgRotator].Description;

    let sOutput1 = sStart.substr(0, 160);
    sOutput1 += "...";

    sStart = arrSneakers[iCurrentImgRotator - 1].Description;

    let sOutput2 = sStart.substr(0, 160);
    sOutput2 += "...";

    //----Sliders
    document.getElementById('f-s-rotator1').src = arrSneakers[iCurrentImgRotator].Link;
    document.getElementById('f-s-rotator1-text').innerHTML = sOutput1;
    document.getElementById('f-s-rotator2').src = arrSneakers[iCurrentImgRotator - 1].Link;
    document.getElementById('f-s-rotator2-text').innerHTML = sOutput2;

}

//--Add to cart

function AddToCart(ClickedId) {

    if (confirm("Do you want to add this item to your cart?")) {

        //find the source of the image inside the clicked item
        var sSrc = document.getElementById(ClickedId).src;

        //Convert the source to match the style of the object's link property
        var iLengthOfSrc = sSrc.length;
        var iStartPoint = sSrc.indexOf('Assets/ExampleDesign');

        var sNewSrc = sSrc.substr(iStartPoint, iLengthOfSrc);
        var sNewSrc = '../' + sNewSrc;

        //Find which object in arrSneakers matches the image that was clicked
        var iIndex = arrSneakers.findIndex(object => {
            return object.Link === sNewSrc;
        })

        //Test if the object can be added to the cart
        if (iIndex == -1) {
            alert("Cannot add an unknown sneaker to the cart");
        } else {
            //Search if the item has already been added
            for (let k = 0; k < arrSneakers.length; k++) {

                if (arrSneakers[iIndex].InCart == true) {

                    alert(arrSneakers[iIndex].Name + " already in cart");

                    break;
                }

            }

            //Add the object to the cart if it has not already been added
            if (arrSneakers[iIndex].InCart == false) {

                arrSneakers[iIndex].InCart = true;

                alert(arrSneakers[iIndex].Name + ' successfully added to cart!!');
            }
        }

    }
}

//--Sneaker of the Week Add to Cart
function SOTWCart() {
    //----Test to see if it is already inside the cart
    for (let k = 0; k < arrSneakers.length; k++) {
        if (arrSneakers[6].InCart == true) {
            alert(arrSneakers[6].Name + ' already in your cart');

            break;
        }
    }

    //----Add to cart if it is not inside already
    if (arrSneakers[6].InCart == false) {
        if (confirm("Do you want to add this item to your cart?")) {
            arrSneakers[6].InCart = true;

            alert(arrSneakers[6].Name + ' successfully added to cart!!');
        }
    }
}

//--Home page contact form submit button

var bContactSubmitted = false;

function submit() {

    //----Get all the applicable values
    var sEmail = document.getElementById("email").value;
    var sName = document.getElementById("name").value;
    var sSubject = document.getElementById("subject").value;
    var sBody = document.getElementById("body").value;

    //----If the form has not been submitted yet, it will continue
    if (bContactSubmitted == false) {

        if (sEmail <= 10) {
            alert('Not a valid email')
        } else if (sName <= 1) {
            alert('Name is too short')
        } else if (sSubject <= 4) {
            alert('Subject is line too short')
        } else if (sBody <= 10) {
            alert('Body is too short')
        } else {
            console.log("Email: " + sEmail);
            console.log("Name and surname: " + sName);
            console.log("Subject: " + sSubject);
            console.log("Body: " + sBody);

            alert("Contact form submitted");

            bContactSubmitted = true;
        }

    } else if (bContactSubmitted == true) {
        alert('Contact form has already been submitted');
    }

}

//--Home page currency converter
function convert() {
    //----Obtain which currency is currently selected
    var iCurrencySelectValue = document.getElementById("currency-filter").selectedIndex;

    //----Obtain the amount that was entered and instantiate the output
    var rCurrency = document.getElementById("converter-input").value;
    var rOutput = 0;

    //----Test if a value has been entered
    if (rCurrency == 0) {

        alert("Please input a value");

    } else {

        //----Divide or multiply depending on what is needed
        if (iCurrencySelectValue == 0) {
            rOutput = rCurrency * 14;
        } else if (iCurrencySelectValue == 1) {
            rOutput = rCurrency / 14;

            //----Round the output to avoid overly long results
            rOutput = rOutput.toFixed(2);
        }

    }

    document.getElementById("converter-output").innerHTML = rOutput;

}

function CurrencyChange() {
    //----Obtain the new value of the selected item
    var iCurrencySelectValue = document.getElementById("currency-filter").selectedIndex;

    //----Swap the name in the output label
    if (iCurrencySelectValue == 0) {
        document.getElementById('converter-label-js').innerHTML = "Rands";
    } else if (iCurrencySelectValue == 1) {
        document.getElementById('converter-label-js').innerHTML = "Dollars";
    }

    //----Reset the input and output values
    document.getElementById('converter-output').innerHTML = 0;
    document.getElementById('converter-input').setAttribute("value", 0);
}


//Sneakers Page
//--Sneakers Page Startup
var iCounter = 0;
var iMax = 0;

function SneakersLoad() {

    //----Calculate the length of the display array
    if (iMax == 0) {
        for (let k = 0; k < arrDisplay.length; k++) {
            iMax += 1;
        }

        //----Compensate for the other three carousels
        iMax -= 3;
    }

    //----Generating a shorter description
    //------Output 1
    var sStart = arrDisplay[iCounter].Description;

    let sOutput1 = sStart.substr(0, 110);
    sOutput1 += "...";

    //------Output 2
    sStart = arrDisplay[iCounter + 1].Description;

    let sOutput2 = sStart.substr(0, 110);
    sOutput2 += "...";

    //------Output 3
    sStart = arrDisplay[iCounter + 2].Description;

    let sOutput3 = sStart.substr(0, 110);
    sOutput3 += "...";

    //------Output 4
    sStart = arrDisplay[iCounter + 3].Description;

    let sOutput4 = sStart.substr(0, 110);
    sOutput4 += "...";

    //----Carousel Output
    document.getElementById('Carousel1').src = arrDisplay[iCounter].Link;
    document.getElementById('Carousel1-text').innerHTML = sOutput1;

    document.getElementById('Carousel2').src = arrDisplay[iCounter + 1].Link;
    document.getElementById('Carousel2-text').innerHTML = sOutput2;

    document.getElementById('Carousel3').src = arrDisplay[iCounter + 2].Link;
    document.getElementById('Carousel3-text').innerHTML = sOutput3;

    document.getElementById('Carousel4').src = arrDisplay[iCounter + 3].Link;
    document.getElementById('Carousel4-text').innerHTML = sOutput4;

    //----Increase the counter 
    iCounter += 1;

    //----Test if the carousel has reached the maximum value
    if (iCounter == iMax) {
        iCounter -= iCounter;
    }

    //----Change the image every 8 seconds
    Timeout = setTimeout(SneakersLoad, 8000);
}

//--Filter
function Filter() {
    //----Find the current selected item in the filter
    var dFilter = document.getElementById("filters");
    var iFilterValue = dFilter.options[dFilter.selectedIndex].value;

    //----Change the output based on the filter
    //------Empty Display Array
    arrDisplay = [];

    //------Populate the array if there is no filter applied
    if (iFilterValue == 0) {

        for (let i = 0; i < arrSneakers.length; i++) {
            arrDisplay.push(arrSneakers[i]);
        }

        //------Populate the array if there is a filter applied
    } else if (iFilterValue > 0) {

        arrDisplay = arrSneakers.filter(function (el) {
            return el.Rating == iFilterValue;
        });

    }

    if (arrDisplay.length < 4) {
        for (let i = 0; i < 3; i++) {
            arrDisplay.push(objNotFound);

            console.log(arrDisplay);
        }
    }

    //----Reset the maximum value so it can be recalculated
    iMax = 0;

    //----Reset the counter so it starts again
    iCounter = 0;

    //----Restart the timer in SneakersLoad() to avoid having multiple timers on at once
    clearTimeout(Timeout);

    //----Reload SneakersLoad()
    SneakersLoad();
}

//--Select Random Sneaker
function RandomSneaker() {

    //----Calculate a random number between 0 and the maximum length of the array
    var iRandom = Math.floor(Math.random() * arrSneakers.length);

    //----Removing custom sneakers as they are added by the user
    while (arrSneakers[iRandom].Rating == -1) {
        var iRandom = Math.floor(Math.random() * arrSneakers.length);
    }

    //----Generating a shorter description
    var sStart = arrSneakers[iRandom].Description;

    let sOutput1 = sStart.substr(0, 220);
    sOutput1 += "...";

    //----Sliders
    document.getElementById('js-random-img').src = arrSneakers[iRandom].Link;
    document.getElementById('random-info').innerHTML = sOutput1;
}

//--Finding the most expensive sneaker and displaying it
//--Most Expensive
var rHighestPrice = arrSneakers[0].Price;
var iHighestIndex = 0;

function MostExpensive() {

    //----Calculate which item has the highest cost
    for (let k = 0; k < arrSneakers.length; k++) {
        if (rHighestPrice < arrSneakers[k].Price) {

            rHighestPrice = arrSneakers[k].Price;
            iHighestIndex = k;

        }
    }

    //----Create a variable to store the data
    objMostExpensiveSneaker = arrSneakers[iHighestIndex];

    //----Generating a shorter description
    var sStart = objMostExpensiveSneaker.Description;

    let sOutput1 = sStart.substr(0, 170);
    sOutput1 += "...";

    //----Sliders
    document.getElementById("high-price-js").src = objMostExpensiveSneaker.Link;
    document.getElementById("high-info-js").innerHTML = sOutput1;

}

//--Least expensive
var rLowestPrice = arrSneakers[0].Price;
var iLowestIndex = 0;

function LeastExpensive() {

    //----Calculate which item has the lowest cost
    for (let k = 0; k < arrSneakers.length; k++) {
        if (rLowestPrice > arrSneakers[k].Price) {

            rLowestPrice = arrSneakers[k].Price;
            iLowestIndex = k;

        }
    }

    //----Create a variable to store the data
    objLeastExpensiveSneaker = arrSneakers[iLowestIndex];

    //----Generating a shorter description
    var sStart = objLeastExpensiveSneaker.Description;

    let sOutput1 = sStart.substr(0, 149);
    sOutput1 += "...";

    //----Sliders
    document.getElementById("low-price-js").src = objLeastExpensiveSneaker.Link;
    document.getElementById("low-info-js").innerHTML = sOutput1;

}

//--Checkout Adder Form 
var iCheckoutCounter = 0;
var rPrice = 0;
var iDaysToCleanCheckout = 0;

function SubmitCheckout() {

    //----Find which item in the selector was selected
    var dFilterCheckout = document.getElementById("sneaker-type");
    var iFilterValueCheckout = dFilterCheckout.options[dFilterCheckout.selectedIndex].value;

    //----Collect all relevant information
    var sNameCheckout = document.getElementById('name-surname-checkout').value;
    var sEmailCheckout = document.getElementById('email-checkout').value;
    var sType = dFilterCheckout.options[dFilterCheckout.selectedIndex].innerHTML;
    var sAddress = document.getElementById('address').value;

    //----Test to see if any fields are incorrect
    if (sNameCheckout <= 1) {
        alert('Name is too short')
    } else if (sEmailCheckout <= 10) {
        alert('Not a valid email')
    } else if (iFilterValueCheckout == 0) {
        alert('Please select a sneaker type')
    } else if (sAddress <= 10) {
        alert('Body is too short')
    } else {

        //----Increase the number used to display which custom item this is
        iCheckoutCounter += 1;

        //----Change the price and days to clean based off which value was selected in the selector
        if (iFilterValueCheckout == 1) {

            rPrice = 300;
            iDaysToCleanCheckout = 14;

        } else if (iFilterValueCheckout == 2) {

            rPrice = 250;
            iDaysToCleanCheckout = 10;

        } else if (iFilterValueCheckout == 3) {

            rPrice = 230;
            iDaysToCleanCheckout = 8;

        } else if (iFilterValueCheckout == 4) {

            rPrice = 200;
            iDaysToCleanCheckout = 6;

        }

        //----Console log the data
        console.log("Name and surname: " + sNameCheckout);
        console.log("Email: " + sEmailCheckout);
        console.log("Sneaker type: " + sType);
        console.log("Address: " + sAddress);
        console.log("-------------------");

        alert("Item added to cart");

        //----Create the new item
        var NewItem = {
            Name: "Unique Item " + iCheckoutCounter,
            Price: rPrice,
            DaysToClean: iDaysToCleanCheckout,
            Rating: -1,
            Description: "This sneaker will be picked up by the courier, or you can deposit it in your local Sneaky Cleaners branch.",
            Link: "../Assets/ExampleDesign/Assets/Logo/svg/Logo.svg",
            InCart: true
        }

        //----Add the item to the sneakers array
        arrSneakers.push(NewItem);

    }
    
}


//Checkout Page
//--Checkout page load
//----Calculate a random number between 0 and the maximum length of the array
var iRandomCheckout1 = Math.floor(Math.random() * arrSneakers.length);
var iRandomCheckout2 = Math.floor(Math.random() * arrSneakers.length);
var iRandomCheckout3 = Math.floor(Math.random() * arrSneakers.length);
var iRandomCheckout4 = Math.floor(Math.random() * arrSneakers.length);
var iRandomCheckout5 = Math.floor(Math.random() * arrSneakers.length);

//----Test for duplicates
for (let k = 0; k < 2; k++) {//Loops twice to ensure all duplicates have been removed

    while (iRandomCheckout1 == iRandomCheckout2 || iRandomCheckout1 == iRandomCheckout3 || iRandomCheckout1 == iRandomCheckout4 || iRandomCheckout1 == iRandomCheckout5) {
        iRandomCheckout1 = Math.floor(Math.random() * arrSneakers.length);
    }

    while (iRandomCheckout2 == iRandomCheckout3 || iRandomCheckout2 == iRandomCheckout4 || iRandomCheckout2 == iRandomCheckout5) {
        iRandomCheckout2 = Math.floor(Math.random() * arrSneakers.length);
    }

    while (iRandomCheckout3 == iRandomCheckout4 || iRandomCheckout3 == iRandomCheckout5) {
        iRandomCheckout3 = Math.floor(Math.random() * arrSneakers.length);
    }

    while (iRandomCheckout4 == iRandomCheckout5) {
        iRandomCheckout4 = Math.floor(Math.random() * arrSneakers.length);
    }

}

//----Checkout Page Load
var iAmntClean = 0;

function CheckoutPageLoad() {

    //------Count how many sneakers have not been cleaned yet
    for (let k = 0; k < arrRandom.length; k++) {
        if (arrSneakers[arrRandom[k]].DaysToClean <= 6) {
            iAmntClean += 1;
        }
    }

    //------Display the output
    document.getElementById("cart-title-js").innerHTML = "Cart - " + iAmntClean + "/5 cleaned";

    //------Cart Item 1
    //--------Generating a shorter description
    var sStart = arrSneakers[iRandomCheckout1].Description;

    let sOutput1 = sStart.substr(0, 160);
    sOutput1 += "...";

    //--------Sliders
    document.getElementById("checkout-name-js-1").innerHTML = arrSneakers[iRandomCheckout1].Name;
    document.getElementById("checkout-desc-js-1").innerHTML = sOutput1;
    document.getElementById("checkout-img-js-1").src = arrSneakers[iRandomCheckout1].Link;
    document.getElementById("checkout-price-js-1").innerHTML = "R" + arrSneakers[iRandomCheckout1].Price;
    document.getElementById("checkout-time-js-1").innerHTML = arrSneakers[iRandomCheckout1].DaysToClean + " Days";

    //------Cart Item 2
    //--------Generating a shorter description
    var sStart = arrSneakers[iRandomCheckout2].Description;

    let sOutput2 = sStart.substr(0, 160);
    sOutput2 += "...";

    //--------Sliders
    document.getElementById("checkout-name-js-2").innerHTML = arrSneakers[iRandomCheckout2].Name;
    document.getElementById("checkout-desc-js-2").innerHTML = sOutput2;
    document.getElementById("checkout-img-js-2").src = arrSneakers[iRandomCheckout2].Link;
    document.getElementById("checkout-price-js-2").innerHTML = "R" + arrSneakers[iRandomCheckout2].Price;
    document.getElementById("checkout-time-js-2").innerHTML = arrSneakers[iRandomCheckout2].DaysToClean + " Days";

    //------Cart Item 3
    //--------Generating a shorter description
    var sStart = arrSneakers[iRandomCheckout3].Description;

    let sOutput3 = sStart.substr(0, 160);
    sOutput3 += "...";

    //--------Sliders
    document.getElementById("checkout-name-js-3").innerHTML = arrSneakers[iRandomCheckout3].Name;
    document.getElementById("checkout-desc-js-3").innerHTML = sOutput3;
    document.getElementById("checkout-img-js-3").src = arrSneakers[iRandomCheckout3].Link;
    document.getElementById("checkout-price-js-3").innerHTML = "R" + arrSneakers[iRandomCheckout3].Price;
    document.getElementById("checkout-time-js-3").innerHTML = arrSneakers[iRandomCheckout3].DaysToClean + " Days";
}

//--Cart scroller
//----Variable declarations
var iCounter = 0;

//----Array to display every cart item as the cart items are moved up and down
var arrRandom = [];
arrRandom.push(iRandomCheckout1);
arrRandom.push(iRandomCheckout2);
arrRandom.push(iRandomCheckout3);
arrRandom.push(iRandomCheckout4);
arrRandom.push(iRandomCheckout5);

//----Moving the cart up
function CheckoutUp() {

    if (iCounter > 0) {//Will not activate if the cart is at it's topmost point
        iCounter -= 1;

        //------Cart Item 1
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter]].Description;

        let sOutput1 = sStart.substr(0, 160);
        sOutput1 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-1").innerHTML = arrSneakers[arrRandom[iCounter]].Name;
        document.getElementById("checkout-desc-js-1").innerHTML = sOutput1;
        document.getElementById("checkout-img-js-1").src = arrSneakers[arrRandom[iCounter]].Link;
        document.getElementById("checkout-price-js-1").innerHTML = "R" + arrSneakers[[arrRandom[iCounter]]].Price;
        document.getElementById("checkout-time-js-1").innerHTML = arrSneakers[[arrRandom[iCounter]]].DaysToClean + " Days";

        //------Cart Item 2
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter + 1]].Description;

        let sOutput2 = sStart.substr(0, 160);
        sOutput2 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-2").innerHTML = arrSneakers[arrRandom[iCounter + 1]].Name;
        document.getElementById("checkout-desc-js-2").innerHTML = sOutput2;
        document.getElementById("checkout-img-js-2").src = arrSneakers[arrRandom[iCounter + 1]].Link;
        document.getElementById("checkout-price-js-2").innerHTML = "R" + arrSneakers[arrRandom[iCounter + 1]].Price;
        document.getElementById("checkout-time-js-2").innerHTML = arrSneakers[arrRandom[iCounter + 1]].DaysToClean + " Days";

        //------Cart Item 3
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter + 2]].Description;

        let sOutput3 = sStart.substr(0, 160);
        sOutput2 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-3").innerHTML = arrSneakers[arrRandom[iCounter + 2]].Name;
        document.getElementById("checkout-desc-js-3").innerHTML = sOutput3;
        document.getElementById("checkout-img-js-3").src = arrSneakers[arrRandom[iCounter + 2]].Link;
        document.getElementById("checkout-price-js-3").innerHTML = "R" + arrSneakers[arrRandom[iCounter + 2]].Price;
        document.getElementById("checkout-time-js-3").innerHTML = arrSneakers[arrRandom[iCounter + 2]].DaysToClean + " Days";

    }

}

//----Moving the cart down
function CheckoutDown() {

    if (iCounter + 3 < 5) {//Will not move if the cart is at its bottommost point
        iCounter += 1;

        //------Cart Item 1
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter]].Description;

        let sOutput1 = sStart.substr(0, 160);
        sOutput1 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-1").innerHTML = arrSneakers[arrRandom[iCounter]].Name;
        document.getElementById("checkout-desc-js-1").innerHTML = sOutput1;
        document.getElementById("checkout-img-js-1").src = arrSneakers[arrRandom[iCounter]].Link;
        document.getElementById("checkout-price-js-1").innerHTML = "R" + arrSneakers[[arrRandom[iCounter]]].Price;
        document.getElementById("checkout-time-js-1").innerHTML = arrSneakers[[arrRandom[iCounter]]].DaysToClean + " Days";

        //------Cart Item 2
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter + 1]].Description;

        let sOutput2 = sStart.substr(0, 160);
        sOutput2 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-2").innerHTML = arrSneakers[arrRandom[iCounter + 1]].Name;
        document.getElementById("checkout-desc-js-2").innerHTML = sOutput2;
        document.getElementById("checkout-img-js-2").src = arrSneakers[arrRandom[iCounter + 1]].Link;
        document.getElementById("checkout-price-js-2").innerHTML = "R" + arrSneakers[arrRandom[iCounter + 1]].Price;
        document.getElementById("checkout-time-js-2").innerHTML = arrSneakers[arrRandom[iCounter + 1]].DaysToClean + " Days";

        //------Cart Item 3
        //--------Generating a shorter description
        var sStart = arrSneakers[arrRandom[iCounter + 2]].Description;

        let sOutput3 = sStart.substr(0, 160);
        sOutput3 += "...";

        //--------Slider1
        document.getElementById("checkout-name-js-3").innerHTML = arrSneakers[arrRandom[iCounter + 2]].Name;
        document.getElementById("checkout-desc-js-3").innerHTML = sOutput3;
        document.getElementById("checkout-img-js-3").src = arrSneakers[arrRandom[iCounter + 2]].Link;
        document.getElementById("checkout-price-js-3").innerHTML = "R" + arrSneakers[arrRandom[iCounter + 2]].Price;
        document.getElementById("checkout-time-js-3").innerHTML = arrSneakers[arrRandom[iCounter + 2]].DaysToClean + " Days";

    }

}

//----Function to show when the user can or cannot use the controllers
function ControllerOpacity() {

    if (iCounter == 0) {
        document.getElementById("checkout-up-img").style = "opacity: 0.7;";
    } else {
        document.getElementById("checkout-up-img").style = "opacity: 1";
    }

    if (iCounter + 3 == 5) {
        document.getElementById("checkout-down-img").style = "opacity: 0.7;";
    } else {
        document.getElementById("checkout-down-img").style = "opacity: 1";
    }
}


//--Set total and subtotal to the correct values
//----Calculate the total price
var rCartTotal = 0;
for (let k = 0; k < 5; k++) {
    rCartTotal += arrSneakers[arrRandom[k]].Price;
}

//----Set the outputs ot their correct starting values
function TotalSet() {
    document.getElementById("sub-total-js").innerHTML = "R" + rCartTotal;
    document.getElementById("cart-total-js").innerHTML = "R" + rCartTotal;
}


//--Discount form
function Discount() {
    //----Set the valid discount code
    const Discount = "DV100Term2";

    //----Test if the value entered is correct
    if (Discount == document.getElementById("discount-input").value) {

        alert("Valid coupon code entered!");
        rCartTotal = rCartTotal * 0.75;

        //------Round the output to avoid overly long results
        rCartTotal = rCartTotal.toFixed(2);

    } else {
        rCartTotal = 0;

        for (let k = 0; k < 5; k++) {
            rCartTotal += arrSneakers[arrRandom[k]].Price;
        }
    }

    document.getElementById("cart-total-js").innerHTML = "R" + rCartTotal;
}


//--Cart Submit
var bCartSubmitted = false;

function CartSubmit() {
    if (bCartSubmitted == false) {
        alert("Thank you for your purchase!")
        bCartSubmitted = true;

        document.getElementById("checkout-submit").style = "Opacity: 0.5;"
    } else if (bCartSubmitted == true) {
        alert("Your cart has already been submitted and is being processed");
    }
}

var bRands = true;
function change() {

    if (bRands == true) {
        //rands to dollars
        arrSneakers[0].Price /= 14;

        console.log(arrSneakers[0].Price);

        bRands = false;

    } else if (bRands == false) {
        //dollars to rands
        arrSneakers[0].Price *= 14;

        console.log(arrSneakers[0].Price);

        bRands = true;
    }

}