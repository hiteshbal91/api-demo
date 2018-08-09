module.exports = {
    secretKey: "indiaisgreatcountry",
    database: {
        adaptor: 'mongodb',
        config: {
            "name": "test_battle_field",
            // "auth": {
            //     "username": "hdbadmin",
            //     "password": "root",
            // },
            "servers": [{
                "host": "localhost",
                "port": 27017
            }, {
                "host": "localhost",
                "port": 27018
            }, {
                "host": "localhost",
                "port": 27019
            }],
            "options": {
                "poolSize": 10,
                "readPreference": "primaryPreferred",
                "w": "majority",
                "wtimeout": 2000,
                "replicaSet": "hdbrs",
                "useNewUrlParser": true
            }
        }
    }
};