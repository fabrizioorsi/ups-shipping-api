# UPS Shipping Api

This is an ***unofficial*** node.js package that makes interacting with the UPS api easy. Uses the UPS json endpoints.

# Usage
```js
const UPS = require('ups-shipping-api');
const ups = new UPS({
    access_key : "an_access_key",
    username : "a_user_name",
    password : "a_password"
})

var promise_rates = ups.retreive_rates(shipment);
```

*You can create a access_key, username, and password at the UPS Api website.*

# Example
```js
var test_shipment = {
    shipper : {
        address : {
            country_code : "US",
            postal_code : 42512,
        },
    },
    ship_to : {
        address : {
            country_code : "US",
            postal_code : 42512,
        },
    },
    package : {
        weight : 21, // the weight of the package
        dimensions : {
            length : 2,
            width : 2,
            height : 2,
        }
    }
}
var rates = await ups.retreive_rates(test_shipment);
```

# Methods
### retreive_rates
```js
    var promise_rates = ups.retreive_rates(shipment);
```

# Objects and Properties
The api uses several objects (e.g., `shipment`, `package`, etc) throughout. Their definitions with required and optional properties are below.

### Construction Options
```js
{
    // mandatory
    access_key: STRING,
    username: STRING,
    password: STRING,

    // optional
    live : BOOLEAN, // defaults to false; runs requests in UPS sandbox mode
    unit_system : STRING, // select from ["imperial", "metric"]; defaults to "imperial";
}
```

### Shipment Attributes
```js
{
    shipper : ENDPOINT,  // the person the shipment is from
    ship_to :  ENDPOINT, // the person the shipment is for
    package: PACKAGE // the package you are sending
}
```

### Endpoint Attributes
```js
{
    // mandatory
    address : ADDRESS,

    // optional
    name : STRING, // UPS uses up to 36 char
    shipper_number : STRING, // required for negotiated rates
}
```

### Package Attributes
```js
{
    // mandatory
    weight: STRING/FLOAT,
    dimensions: {
        length: STRING/FLOAT,
        width: STRING/FLOAT,
        height: STRING/FLOAT,
    }
}
```

### Address Attributes
```js
{
    // mandatory
    country_code : STRING, // select from ["US", ...(TODO)]
    postal_code : STRING/INT,

    // optional
    lines : [ // a list of address lines
        STRING, ...
    ],
    city : STRING,
    state : STRING,
    province : STRING,
}
```

### Package Attributes
```js
{
    // mandatory
    weight : STRING/FLOAT, // the weight of the package
    dimensions : {
        length : STRING/FLOAT,
        width : STRING/FLOAT,
        height : STRING/FLOAT,
    }
}
```
