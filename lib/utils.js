var _      = require('lodash-node')
var colors = require('colors')

function formatData(data, showTimestamp) {
  var logLineTmpl = _.template('${log}')
  if (showTimestamp) {
    logLineTmpl = _.template('[${timestamp}] ${log}')
  }

  var logs = data.map(function(d) {
    var timestamp = d._source.time.split('.')[0]
    var logLine = logLineTmpl({
      timestamp: timestamp,
      log: d._source.log
    })
    if (d._source.stream == 'stderr') {
      logLine = colors.red(logLine)
    }
    return logLine
  })

  // logs already have newline delimiters
  return logs.reverse().join('')
}

function buildParamsJSON(size, query, time) {
  var params = {
    size: size,
    sort: {
      '@timestamp': 'desc'
    },
    query: {
      filtered: {
        query: {
          query_string: {
            analyze_wildcard: true,
            query: query
          }
        }
      }
    },
    highlight: {
      pre_tags: ['@kibana-highlighted-field@'],
      post_tags: ['@/kibana-highlighted-field@'],
      fields: {
        '*': {}
      }
    },
    fields: ['*', '_source'],
    script_fields: {},
    fielddata_fields: ['@timestamp', 'time', 'data.data._object.events.event_timestamp', 'timestamp', 'data.data._object.events.session.start_timestamp', 'requestOpts.time', 'requestOpts.@timestamp', 'data.data._object.events.session.stop_timestamp', 'data.time', 'data.@timestamp', 'data.data.time']
  }

  if (time) {
    params.query.filtered.filter = {
      bool: {
        must: [{
          range: {
            '@timestamp': {
              gt: Date.parse(time)
            }
          }
        }]
      }
    }
  }

  return JSON.stringify(params)
}

module.exports = {
  formatData: formatData,
  buildParamsJSON: buildParamsJSON
}
