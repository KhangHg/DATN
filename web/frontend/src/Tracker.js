import { trackSelfDescribingEvent, newTracker, trackPageView, setUserId, addGlobalContexts, removeGlobalContexts } from '@snowplow/browser-tracker';
import {
    SnowplowEcommercePlugin, trackProductView
} from '@snowplow/browser-plugin-snowplow-ecommerce';

function ViewProduct(name, price, id, category) {
    trackSelfDescribingEvent({
        event: {
            schema: 'iglu:nana.shop/product_action/jsonschema/1-0-0',
            data: {
                action: 'view',
            },
        },
        context: [
            {
                schema: 'iglu:nana.shop/product_entity/jsonschema/1-0-0',
                data: {
                    name: name,
                    price: price,
                    id: id,
                    category: category
                }
            }
        ],
    });
    // trackPageView()
    // TrackProductView(name, price, id, category)
}

function TrackProductView(name, price, id, category) {
    trackProductView({
        id: id,
        name: name,
        price: price,
        category: category,
        currency: "VND"
    })
}

function AddProduct(name, price, id, category, size, qty) {
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:nana.shop/product_action/jsonschema/1-0-0",
            data: {
                action: 'add',
            }
        },
        context: [
            {
                schema: 'iglu:nana.shop/product_entity/jsonschema/1-0-0',
                data: {
                    id: id,
                    name: name,
                    price: price,
                    currency: "VND",
                    quantity: qty,
                    category: category,
                    size: size
                }
            }
        ]
    })
}

function RemoveProduct(name, price, id, category, size, qty) {
    trackSelfDescribingEvent({
        event: {
            schema: "iglu:nana.shop/product_action/jsonschema/1-0-0",
            data: {
                action: 'remove from cart',
            }
        },
        context: [
            {
                schema: 'iglu:nana.shop/product_entity/jsonschema/1-0-0',
                data: {
                    id: id,
                    name: name,
                    price: price,
                    currency: "VND",
                    quantity: qty,
                    size: size,
                    category: category
                }
            }
        ]
    })
}

function PurchaseProduct(items) {
    var contexts = []
    // console.log(items);
    items.forEach(item => {
        var product = {
            schema: 'iglu:nana.shop/product_entity/jsonschema/1-0-0',
            data: {
                id: String(item.productId),
                name: item.name,
                price: item.price,
                currency: "VND",
                quantity: item.quantity,
                size: item.size,
                category: item.category
            }
        }
        contexts.push(product)
    });

    trackSelfDescribingEvent({
        event: {
            schema: "iglu:nana.shop/product_action/jsonschema/1-0-0",
            data: {
                action: 'purchase',
            }
        },
        context: contexts
    })
}

function CreatNewTracker() {
    newTracker('tracking_product', 'localhost:8080', {
        appId: 'ecomerceshop',
        plugins: [SnowplowEcommercePlugin()],
        discoverRootDomain: true,
        cookieSameSite: 'Lax', // Recommended
        contexts: {
            webPage: true // default, can be omitted
        }
    });
}

function TrackPageView() {
    trackPageView()
}

function SetEmailUser(email) {
    setUserId(email)
}

function AddUserContext(id, name, phone, email) {
    console.log("user id : " + id);
    let user_context = {
        schema: "iglu:nana.shop/user_context/jsonschema/1-0-0",
        data: {
            user_id: String(id),
            user_name: String(name),
            phone_number: String(phone),
            email: String(email)
        }

    }

    addGlobalContexts([user_context])
}

function RemoveUserContext(id, name, phone, email) {

    let user_context = {
        schema: "iglu:nana.shop/user_context/jsonschema/1-0-0",
        data: {
            user_id: String(id),
            user_name: String(name),
            phone_number: String(phone),
            email: String(email)
        }

    }

    removeGlobalContexts([user_context])
}

export { ViewProduct, AddProduct, CreatNewTracker, PurchaseProduct, RemoveProduct, TrackPageView, TrackProductView, SetEmailUser, AddUserContext, RemoveUserContext };