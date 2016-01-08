# Kibana log streamer

This tool is handy for streaming logs that you are storing in ElasticSearch

# Setup

To use this tool you must make sure that you have node installed on your
machine, as well as having installed the dependencies for this tool.

**Assuming you are running on Mac**

```bash
	$ brew install npm
	$ make
```

# Running the streamer

```bash
	$ ./bin/pull-logs -q "app.raw:spew"
	{"method":"GET","path":"/","status":"200","size":"13","duration":0.000457428}
	10.10.80.100 - - [16/Dec/2015:19:01:52 +0000] "GET / HTTP/1.0" 200 13 0.0009
	{"method":"GET","path":"/","status":"200","size":"13","duration":0.000405188}
	10.10.70.192 - - [16/Dec/2015:19:01:52 +0000] "GET / HTTP/1.0" 200 13 0.0010
	{"method":"GET","path":"/","status":"200","size":"13","duration":0.000501326}
```

## Useful features

This utility comes with all sorts of useful features
```bash
	$ ./bin/pull-logs --help
	Usage: bin/pull-logs

	Options:
		-h, --help           Show help  [boolean]
		-n, --number         The max number of results ElasticSearch will return  [default: 5]
		-q, --query          the query to perform in ElasticSearch  [required]
		-i, --instance-name  prepend instance name to logs  [boolean]
		-t, --timestamp      prepend timestamp to logs  [boolean]
		-f                   stream output as data is pumped into ElasticSearch  [boolean]
		-r, --refresh        refresh rate for streaming output (ms)  [default: 500]

	Examples:
		bin/pull-logs  Pulls logs from kibana and formats output
```
