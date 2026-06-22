// ==================================
// FOODRADAR - Main JavaScript File
// ==================================

console.log("FoodRadar is running 🚀");


// Exemple de données nourriture (MVP)
// Plus tard, ces données viendront d'une base de données

const foods = [
    {
        name: "Waakye",
        price: "30 GHS",
        vendor: "Mama's Kitchen",
        location: "Kumasi",
        category: "Ghanaian Food"
    },
    {
        name: "Fufu & Light Soup",
        price: "40 GHS",
        vendor: "Local Food Spot",
        location: "Kumasi",
        category: "Traditional Food"
    },
    {
        name: "Jollof Rice",
        price: "35 GHS",
        vendor: "Royal Taste",
        location: "Kumasi",
        category: "African Food"
    }
];


// Afficher les plats dans la console pour tester

foods.forEach(food => {
    console.log(
        food.name + 
        " - " + 
        food.vendor
    );
});


// Fonction recherche nourriture

function searchFood(keyword) {

    const results = foods.filter(food =>
        food.name
        .toLowerCase()
        .includes(keyword.toLowerCase())
    );

    return results;
}


// Exemple utilisation

console.log(
    searchFood("Waakye")
);
