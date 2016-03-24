exports.template = [{
	$project: {
		"minutes": {
			$minute: "$date"
		},
		"hour": {
			"$hour": "$date"
		},
		"month": {
			$month: "$date"
		},
		"day": {
			$dayOfMonth: "$date"
		}

	}
}, {
	$group: {
		"_id": {
			"minute": "$minutes",
			"hour": "$hour",
			"day": "$day",
			"month": "$month"
		},		
	}
}];