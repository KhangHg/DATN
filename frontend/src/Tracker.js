import { trackSelfDescribingEvent, newTracker, trackPageView } from '@snowplow/browser-tracker';
import { SnowplowEcommercePlugin, addItem } from '@snowplow/browser-plugin-snowplow-ecommerce';
function ViewProduct(name, price, id) {
    console.log("view" + typeof (name) + typeof (price) + typeof (id));
    trackSelfDescribingEvent({
        event: {
            schema: 'iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0',
            data: {
                type: 'view',
            },
        },
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    name: String(name),
                    price: price,
                    id: String(id)
                }
            }
        ],
    });

    // addItem({
    //     orderId: '1234', // required
    //     sku: 'DD44',     // required
    //     name: 'T-Shirt',
    //     category: 'Green Medium',
    //     price: 11.99,
    //     quantity: 1,
    //     currency: 'USD'
    // });
}

function AddProduct(name, price, id, qty) {
    console.log("add" + typeof (name) + typeof (price) + typeof (id) + typeof (qty));
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
            data: {
                type: 'add',
            }
        },
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    id: id,
                    name: name,
                    price: price,
                    quantity: qty
                }
            }
        ]
    })
}

function RemoveProduct(name, price, id, qty) {
    console.log("remove" + typeof (name) + typeof (price) + typeof (id) + typeof (qty));
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:test.example.iglu/cart_action_event/jsonschema/1-0-0",
            data: {
                type: 'remove',
            }
        },
        context: [
            {
                schema: 'iglu:test.example.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    id: id,
                    name: name,
                    price: price,
                    quantity: qty
                }
            }
        ]
    })
}

function CreatNewTracker() {
    newTracker('tracking_product', 'localhost:9090', {
        appId: 'ecomerceshop',
        plugins: [SnowplowEcommercePlugin()],
        discoverRootDomain: true,
        cookieSameSite: 'Lax', // Recommended
        contexts: {
            webPage: true // default, can be omitted
        }
    });
}


export { ViewProduct, AddProduct, CreatNewTracker, RemoveProduct, trackPageView };