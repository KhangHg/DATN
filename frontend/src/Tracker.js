import { trackSelfDescribingEvent, newTracker, trackPageView, setUserId } from '@snowplow/browser-tracker';
import {
    SnowplowEcommercePlugin, trackProductView
} from '@snowplow/browser-plugin-snowplow-ecommerce';

function ViewProduct(name, price, id, category) {
    trackSelfDescribingEvent({
        event: {
            schema: 'iglu:nana.shop.iglu/product_action_event/jsonschema/1-0-0',
            data: {
                type: 'view',
            },
        },
        context: [
            {
                schema: 'iglu:nana.shop.iglu/product_entity/jsonschema/1-0-0',
                data: {
                    name: name,
                    price: price,
                    id: id,
                    category: category
                }
            }
        ],
    });
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
            schema: "iglu:nana.shop.iglu/product_action_event/jsonschema/1-0-0",
            data: {
                type: 'add',
            }
        },
        context: [
            {
                schema: 'iglu:nana.shop.iglu/product_entity/jsonschema/1-0-0',
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
            schema: "iglu:nana.shop.iglu/product_action_event/jsonschema/1-0-0",
            data: {
                type: 'remove from cart',
            }
        },
        context: [
            {
                schema: 'iglu:nana.shop.iglu/product_entity/jsonschema/1-0-0',
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

function TrackPageView() {
    trackPageView()
}

function SetEmailUser(email) {
    setUserId(email)
}

export { ViewProduct, AddProduct, CreatNewTracker, RemoveProduct, TrackPageView, TrackProductView, SetEmailUser };