var request = require('request')
var utils = require('./utils')
var config = require('config')
var url = require('url')

function gatherLogs(opts, callback) {
  var kibana = url.resolve(config.kibanaURL, '/elasticsearch/_msearch?timeout=0&ignore_unavailable=true&preference=1450284172373')
  var parameters = utils.buildParamsJSON(opts.size, opts.query, opts.timestampFilter)
  var payload = '{"index":"logstash-*","ignore_unavailable":true}\n' + parameters + '\n'

  request.post({
    url: kibana,
    body: payload
  }, function(err, res, body) {
    if (err) {
      return callback(err)
    }

    var rawData = JSON.parse(body)
    var data = rawData.responses[0].hits.hits
    if (!data.length) {
      return callback(null, {logs: '', latest: opts.timestampFilter})
    }

    var lastEntry = data[0]._source['@timestamp']

    var logs = utils.formatData(data, opts.showTimestamp)
    callback(null, {logs: logs, latest: lastEntry})
  })
}

module.exports = gatherLogs
