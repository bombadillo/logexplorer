# logexplorer

View logs in a pageable easy to read format.

## Log format
The format of the log should be as follows:

`DATE|LOGLEVEL|LOGGERNAME(optional)|MESSAGE`

e.g.

`2016-01-22 10:35:38.2305|ERROR|Build process failed`

### Date
The format of the date can be any format that [JavaScript will accept](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Optional log item columns
* `LOGGERNAME` is optional. This has been added to enable the logger name from [NLog](https://github.com/NLog/NLog/) to be output.
