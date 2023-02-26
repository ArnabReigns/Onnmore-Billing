
/**
 * ### Get Categories
 * @param {list} services service array.
 */
function getCategories(services) {
    return [...new Set(
        services.map(item => item.category)
    )].map(category => ({ name: category }));
} 


export {getCategories};