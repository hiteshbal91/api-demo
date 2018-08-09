module.exports = {
    secretKey: "indiaisgreatcountry",
    database: {
        adaptor: 'mongodb',
        config: {
            "name": "battle_fields",
            "auth": {
                "username": "appUser",
                "password": "=rxL#3X$4p;C",
            },
            "servers": [{
                "host": "ds215822.mlab.com",
                "port": 15822
            }],
            "options": {
                // "poolSize": 10,
                // "readPreference": "primaryPreferred",
                // "w": "majority",
                // "wtimeout": 2000,
                // "replicaSet": "hdbrs",
                "useNewUrlParser": true
            }
        }
    }
};