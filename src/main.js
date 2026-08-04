function mainDataCheck(data, options) {
    if (!data 
        || !Array.isArray(data.sellers) || !Array.isArray(data.products) || !Array.isArray(data.purchase_records) 
        || data.sellers.length === 0 || data.products.length === 0 || data.purchase_records.length === 0
        || typeof options !== "object") 
    throw new Error('Некорректные входные данные');
}

/**
 * Функция для расчета выручки
 * @param purchase запись о покупке
 * @param _product карточка товара
 * @returns {number}
 */
function calculateSimpleRevenue(purchase, _product) {
    const discount =  1 - (purchase.discount / 100)
    return ((_product)? _product.sale_price : purchase.sale_price) * purchase.quantity * discount
}

/**
 * Функция для расчета бонусов
 * @param index порядковый номер в отсортированном массиве
 * @param total общее число продавцов
 * @param seller карточка продавца
 * @returns {number}
 */
function calculateBonusByProfit(index, total, seller) {
    const { profit } = seller
}

/**
 * Функция для анализа данных продаж
 * @param data
 * @param options
 * @returns {{revenue, top_products, bonus, name, sales_count, profit, seller_id}[]}
 */
function analyzeSalesData(data, options) {
    
    mainDataCheck(data, options)

    const { calculateRevenue, calculateBonus } = options; 

    const sellerStats = data.sellers.map(seller => ({
        id: seller.id,
        name: `${seller.first_name} ${seller.last_name}`,
        revenue: 0,
        profit: 0,
        sales_count: 0,
        products_sold: {}
    }));    

    const sellerIndex = {};
    sellerStats.forEach(seller => {
        sellerIndex[seller.id] = seller;
    });

    const productIndex = {};
    data.products.forEach(product => {
        productIndex[product.sku] = product;
    });

    console.log(sellerIndex)

    data.purchase_records.forEach(record => {
        const seller = sellerIndex[record.seller_id];
        seller.sales_count += 1
        seller.revenue += record.total_amount

        // Расчёт прибыли для каждого товара
        record.items.forEach(item => {
            const product = productIndex[item.sku]; // Товар
            let cost = product.sale_price * item.quantity
            console.log(calculateSimpleRevenue(item, product))
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }
            seller.products_sold[item.sku] += 1
            // Посчитать выручку (revenue) с учётом скидки через функцию calculateRevenue
            // Посчитать прибыль: выручка минус себестоимость
            // Увеличить общую накопленную прибыль (profit) у продавца  

            // Учёт количества проданных товаров
            if (!seller.products_sold[item.sku]) {
                seller.products_sold[item.sku] = 0;
            }
            // По артикулу товара увеличить его проданное количество у продавца
        });
    }); 

    // @TODO: Сортировка продавцов по прибыли

    // @TODO: Назначение премий на основе ранжирования

    // @TODO: Подготовка итоговой коллекции с нужными полями
}
