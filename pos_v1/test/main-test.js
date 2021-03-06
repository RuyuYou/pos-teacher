'use strict';

describe('pos', () => {
    let tags;

    beforeEach(() => {
        tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });

    it('should print item', ()=> {
        let allItems = loadAllItems();
        let items = buildCartItems(tags, allItems);
        let expectItems = [
            {
                item: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                },
                count: 5
            },
            {
                item: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 2
            },
            {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            }
        ];
        expect(items).toEqual(expectItems);
    });

    it('should print subTotal and saved', ()=> {
        let promotions = loadPromotions();
        let cartItems = [
            {
                item: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                },
                count: 5
            },
            {
                item: {
                    barcode: 'ITEM000003',
                    name: '荔枝',
                    unit: '斤',
                    price: 15.00
                },
                count: 2
            },
            {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    price: 4.50
                },
                count: 3
            }
        ];
        let receiveCartItems = buildReceiptItems(cartItems, promotions);
        let expectReceiveCartItems = [
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3
                    },
                    count: 5
                },
                subtotal: 12,
                saved: 3
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15
                    },
                    count: 2
                },
                subtotal: 30,
                saved: 0
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000005',
                        name: '方便面',
                        unit: '袋',
                        price: 4.5
                    },
                    count: 3
                },
                subtotal: 9,
                saved: 4.5
            }
        ];
        expect(receiveCartItems).toEqual(expectReceiveCartItems);
    });

    it('should print total and saved', ()=> {
        let receiveCartItems = [
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000001',
                        name: '雪碧',
                        unit: '瓶',
                        price: 3.00
                    },
                    count: 5
                },
                subtotal: 12,
                saved: 3
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        price: 15.00
                    },
                    count: 2
                },
                subtotal: 30,
                saved: 0
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000005',
                        name: '方便面',
                        unit: '袋',
                        price: 4.50
                    },
                    count: 3
                },
                subtotal: 9,
                saved: 4.5
            }
        ];
        let printCartItems = buildReceipt(receiveCartItems);
        let expectReceiveCartItems = {
            receiptItems:
                [
                    {
                        cartItem: {
                            item: {
                                barcode: 'ITEM000001',
                                name: '雪碧',
                                unit: '瓶',
                                price: 3
                            },
                            count: 5
                        },
                        subtotal: 12,
                        saved: 3
                    },
                    {
                        cartItem: {
                            item: {
                                barcode: 'ITEM000003',
                                name: '荔枝',
                                unit: '斤',
                                price: 15
                            },
                            count: 2
                        },
                        subtotal: 30,
                        saved: 0
                    },
                    {
                        cartItem: {
                            item: {
                                barcode: 'ITEM000005',
                                name: '方便面',
                                unit: '袋',
                                price: 4.5
                            },
                            count: 3
                        },
                        subtotal: 9,
                        saved: 4.5
                    }
                ],
            total: 51,
            savedTotal: 7.5
        };
        expect(printCartItems).toEqual(expectReceiveCartItems);
    });

    it('should print text', () => {

        spyOn(console, 'log');

        printReceipt(tags);

        const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
