export const useGetDisplayOrders = (category) => {
    const displayOrders = category.menuItems.map(menuItem => menuItem.displayOrder);
    const additional = displayOrders.length + 1;
    return [...displayOrders, additional];
}