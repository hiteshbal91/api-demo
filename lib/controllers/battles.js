// loading modules
const Express = require('express');
const _ = require('lodash');
const Router = Express.Router();

// loading custom models
const {
    Battles,
    BattlesModel
} = require('./../models/index.js');

module.exports = exports = Router;

// parseSearchParams
function parseSearchParams(query = {}) {
    let filterQuery = {};
    for (const Key in query) {
        const Value = query[Key];
        switch (Key) {
            case 'king':
                filterQuery['$or'] = filterQuery['$or'] || [];
                filterQuery['$or'].push({
                    attacker_king: Value
                }, {
                    defender_king: Value
                });
                break;
            case 'type':
            case 'location':
                filterQuery[[Key]] = Value;
                break;
        }
    }
    return filterQuery;
}
Router
    .get('/a', (req, res, next) => {
        setTimeout(() => {
            res.send("asdasd");
        }, 100);
    });

// Get all places where battle took place
Router
    .get('/list', (req, res, next) => {
        return BattlesModel.find().select('-_id name').exec()
            .then((battles) => {
                res.json({
                    battles: _.map(battles, "name")
                });
            })
            .catch((error) => next(error));
    });

// Get count of total no of battle occured
Router
    .get('/count', (req, res, next) => {
        return BattlesModel.count()
            .then((battles) => {
                res.json({
                    battles
                });
            })
            .catch((error) => next(error));
    });

// Get search battles 
Router
    .get('/search', (req, res, next) => {
        //  parsing query parameters for query
        const Query = parseSearchParams(req.query);
        return BattlesModel.find(Query)
            .then((battles) => {
                res.json({
                    battles
                });
            })
            .catch((error) => next(error));
    });

// Aggregation for stats
Router
    .get('/stats', (req, res, next) => {
        // most_active stages
        const Columns = ['attacker_king', 'defender_king', 'region', 'name'];
        let mostActive = {};
        for (let i = 0, _i = Columns.length; i < _i; i++) {
            mostActive[Columns[i]] = [{
                $match: {
                    [`${Columns[i]}`]: {
                        $ne: ""
                    }
                }
            }, {
                $sortByCount: `$${Columns[i]}`,
            }, {
                $limit: 1
            }];
        };

        return BattlesModel.aggregate([{
                $facet: {
                    ...mostActive,
                    attacker_outcome: [{
                        $match: {
                            attacker_outcome: {
                                $ne: ""
                            }
                        }
                    }, {
                        $sortByCount: "$attacker_outcome",
                    }],
                    battle_type: [{
                        $match: {
                            battle_type: {
                                $ne: ""
                            }
                        }
                    }, {
                        $group: {
                            _id: "$battle_type" // addtoset can also be used to perform operations
                        }
                    }],
                    defender_size: [{
                        $match: {
                            defender_size: {
                                $ne: ""
                            }
                        }
                    }, {
                        $group: {
                            _id: null,
                            average: {
                                $avg: "$defender_size"
                            },
                            min: {
                                $min: "$defender_size"
                            },
                            max: {
                                $max: "$defender_size"
                            }
                        },
                    }, {
                        $project: {
                            _id: 0,
                            average: 1,
                            min: 1,
                            max: 1
                        }
                    }]
                }
            }])
            .then((battles) => {
                let result = {
                    'most_active': {}
                };
                if (!_.isEmpty(battles)) {
                    battles = battles[0];
                    for (const Key in battles) {
                        if (Key === "attacker_outcome") {
                            result[Key] = battles[Key];
                        } else if (Key === "defender_size") {
                            result[Key] = battles[Key][0];
                        } else if (Key === "battle_type") {
                            result[Key] = _.map(battles[Key], "_id");
                        } else {
                            result['most_active'][Key] = battles[Key][0];
                        }
                    }
                }
                res.json(battles);
            })
            .catch((error) => next(error));
    });