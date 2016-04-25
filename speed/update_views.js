var redis = require('redis');

exports.update = function(log) {
    var client = redis.createClient();
    client.on('connect', function() {
        //code_d
        client.get('code_d', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'code': log.code
            }

            if (!reply) {
                client.set('code_d', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('code_d', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('code_d', JSON.stringify(reply));
                }
            }
        });

        //code_h
        client.get('code_h', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'code': log.code
            }
            if (!reply) {
                client.set('code_h', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('code_h', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('code_h', JSON.stringify(reply));
                }
            }
        });

        //code_m
        client.get('code_m', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'minute': log.date.getMinutes(),
                'code': log.code
            }
            if (!reply) {
                client.set('code_m', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('code_m', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('code_m', JSON.stringify(reply));
                }
            }
        });

        //url_d
        client.get('url_d', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
            }
            if (!reply) {
                client.set('url_d', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('url_d', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('url_d', JSON.stringify(reply));
                }
            }
        });

        //url_h
        client.get('url_h', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
            }
            if (!reply) {
                client.set('url_h', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('url_h', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('url_h', JSON.stringify(reply));
                }
            }
        });

        //url_m
        client.get('url_m', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'minute': log.date.getMinutes(),
            }
            if (!reply) {
                client.set('url_m', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('url_m', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('url_m', JSON.stringify(reply));
                }
            }
        });

        //verb_d
        client.get('verb_d', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'verb': log.verb
            }
            if (!reply) {
                client.set('verb_d', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('verb_d', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('verb_d', JSON.stringify(reply));
                }
            }
        });

        //verb_h
        client.get('verb_h', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'verb': log.verb
            }
            if (!reply) {
                client.set('verb_h', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('verb_h', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('verb_h', JSON.stringify(reply));
                }
            }
        });

        //verb_m
        client.get('verb_m', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'minute': log.date.getMinutes(),
                'verb': log.verb
            }
            if (!reply) {
                client.set('verb_m', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('verb_m', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('verb_m', JSON.stringify(reply));
                }
            }
        });

        //weight_d
        client.get('weight_d', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'weight': log.weight
            }
            if (!reply) {
                client.set('weight_d', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('weight_d', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('weight_d', JSON.stringify(reply));
                }
            }
        });

        //weight_h
        client.get('weight_h', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'weight': log.weight
            }
            if (!reply) {
                client.set('weight_h', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('weight_h', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('weight_h', JSON.stringify(reply));
                }
            }
        });

        //weight_m
        client.get('weight_m', function(err, reply) {
            reply = JSON.parse(reply);
            object = {
                'day': log.date.getDate(),
                'month': log.date.getMonth(),
                'hour': log.date.getHours(),
                'minute': log.date.getMinutes(),
                'weight': log.weight
            }
            if (!reply) {
                client.set('weight_m', JSON.stringify([{
                    'count': 1,
                    '_id': object
                }]));
            } else {
                exist = false;
                for (i = 0; i < reply.length; i++) {
                    if (JSON.stringify(reply[i]._id) == JSON.stringify(object)) {
                        reply[i].count++;
                        client.set('weight_m', JSON.stringify(reply));
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    reply.push({
                        'count': 1,
                        '_id': object
                    });
                    client.set('weight_m', JSON.stringify(reply));
                }
            }
        });

    });

}