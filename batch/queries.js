//EXAMPLES OF QUERIES FOR THE BATCH LAYER AGGREGATION PROCESS

//DAY

[
	{
		$project: {			
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"verb" : "$verb"
		}
	},
	{
		$group: {
        "_id":{"verb": "$verb", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{
		$project: {			
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"code" : "$code"
		}
	},
	{
		$group: {
        "_id":{"code": "$code", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{ $match: {"weight": {$ne : 0}}},
	{
		$project: {			
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
            "weight" : 1
			
		}
	},
	{
		$group: {
        "_id":{"day" : "$theday", "month" : "$themonth"},
        "avg_weight": { $avg: "$weight" }
        }
	}
]

//HOUR

[
	{
		$project: {
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"verb" : "$verb"
		}
	},
	{
		$group: {
        "_id":{"verb": "$verb", "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{
		$project: {
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"code" : "$code"
		}
	},
	{
		$group: {
        "_id":{"code": "$code", "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{ $match: {"weight": {$ne : 0}}},
	{
		$project: {			
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
            "weight" : 1
			
		}
	},
	{
		$group: {
        "_id":{"hour" : "$thehour", "day" :  "$theday", "month" : "$themonth"},
        "avg_weight": { $avg: "$weight" }
        }
	}
]

//MINUTE

[
	{
		$project: {
			"theminutes": { $minute: "$date" },
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"code" : "$code"
		}
	},
	{
		$group: {
        "_id":{"code": "$code", "minutes" : "$theminutes" , "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{
		$project: {
			"theminutes": { $minute: "$date" },
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
			"verb" : "$verb"
		}
	},
	{
		$group: {
        "_id":{"verb": "$verb", "minutes" : "$theminutes" , "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]

[
	{ $match: {"weight": {$ne : 0}}},
	{
		$project: {	
			"theminutes": { $minute: "$date" },
			"thehour" : { "$hour": "$date" },			
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" },
            "weight" : 1
			
		}
	},
	{
		$group: {
        "_id":{"minutes" : "$theminutes" , "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "avg_weight": { $avg: "$weight" }
        }
	}
]

[
	{$match : {"url" : {$regex : /styles/}}},
	{
		$project: {
			"theminutes": { $minute: "$date" },
			"thehour" : { "$hour": "$date" },
			"themonth" : { $month: "$date" },
            "theday" : { $dayOfMonth: "$date" }			
		}
	},
	{
		$group: {
        "_id":{"minutes" : "$theminutes" , "hour" : "$thehour", "day" : "$theday", "month" : "$themonth"},
        "count": { $sum: 1 }
        }
	}
]