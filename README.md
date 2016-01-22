# logexplorer

View logs in a pageable easy to read format.

## Optional Requirements
* Web server *
* PHP **

## Log format
The format of the log should be as follows:

`DATE|LOGLEVEL|LOGGERNAME(optional)|MESSAGE`

e.g.

`2016-01-22 10:35:38.2305|ERROR|Build process failed`

### Date
The format of the date can be any format that [JavaScript will accept](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Optional log item columns
* `LOGGERNAME` is optional. This has been added to enable the logger name from [NLog](https://github.com/NLog/NLog/) to be output.

## Data Parsing
The following data types are currently supported:
* JSON
* XML

If a log message contains one of the data types above it will be parsed and displayed within the message text wrapped with `<pre></pre>` so that data outputs are easily identifiable.

e.g.

![alt text](http://i.imgur.com/X1D4fq1.png "Example of data parsing")

\* You can run it without a web server, however, you would need to change the relative paths within `index.html` to absolute paths.

** Only required if you want to be able to specify a specific log directory which will be used to populate a dropdown list with the files found.
