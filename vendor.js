console.log("Vendor system running 🚀");

function addFood() {

    const name = document.getElementById("foodName").value;
    const image = document.getElementById("foodImage").value;
    const price = document.getElementById("foodPrice").value;
    const location = document.getElementById("foodLocation").value;

    if (!name || !image || !price) {
        alert("Please fill all required fields");
        return;
    }

    const newFood = {
        id: Date.now(),
        name: name,
        image: image,
        price: price,
        location: location,
        description: "Added by vendor",
        distance: "0km"
    };

    let storedFoods = JSON.parse(localStorage.getItem("vendorFoods")) || [];

    storedFoods.push(newFood);

    localStorage.setItem("vendorFoods", JSON.stringify(storedFoods));

    alert("Food added successfully 🚀");
}
