var getCode = function(type){
    $.get('api/code/' + type, function(data) {
        var labels = [];
        var series = {};
        for (var i = data.length - 1; i >= 0; i--) {
            
            if(type == "m"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour, data[i]._id.minute);
                labels.push(data[i]._id.day + '/' + data[i]._id.month + ' ( ' + data[i]._id.hour + ':' + data[i]._id.minute + ')');
            }
            if(type == "h"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour);
                labels.push(data[i]._id.day + '/' + data[i]._id.month + ' ( ' + data[i]._id.hour + 'h )');
            }
            if(type == "d"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day);
                labels.push(data[i]._id.day + '/' + data[i]._id.month);
            }            
            if (series[data[i]._id.code] == undefined)
                series[data[i]._id.code] = []
            series[data[i]._id.code].push(data[i].count);
        }

        var tmp = [];
        for (var j in series) {
            tmp.push(series[j]);
        }
        createChart(labels, tmp);
    });
}

var getUrl = function(type){
    $.get('api/url/' + type, function(data) {
        var labels = [];
        var series = [];
        for (var i = data.length - 1; i >= 0; i--) {
            
            if(type == "m"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour, data[i]._id.minute);
                labels.push(data[i]._id.day + '/' + data[i]._id.month + ' ( ' + data[i]._id.hour + ':' + data[i]._id.minute + ')');
            }
            if(type == "h"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day, data[i]._id.hour);
                labels.push(data[i]._id.day + '/' + data[i]._id.month + ' ( ' + data[i]._id.hour + 'h )');
            }
            if(type == "d"){
                data[i].date = new Date(2016, data[i]._id.month - 1, data[i]._id.day);
                labels.push(data[i]._id.day + '/' + data[i]._id.month);
            }            
            
            series.push(data[i].count);
        }

        
        createChart(labels, [series]);
    });
}
getUrl('m');


var createChart = function(labels, series) {
    var data = {
        labels: labels,
        series: series

    };

    var options = {
        width: 900,
        height: 400,
        low: 0
    };

    new Chartist.Line('.ct-chart', data, options);
}