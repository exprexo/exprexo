[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# exprexo - hacked javascript freshly served

> exprexo and javascript make the perfect blend

Zero-configuration command-line javascript server. Like `http-server` for **.js** files.

# Installing globally:

Installation via `npm`:

     npm install exprexo -g

This will install `exprexo` globally so that it may be run from the command line.

## Usage:

     exprexo [options]

## Available Options:

`--directory`, `-d`  A cool directory to be served `[default: "./routes"]`

`--open`, `-o`       Open your browser at the served page `[default: false]`

`--port`, `-p`       A cool port for your exprexo `[default:9000]`

`--verbose` Make exprexo loud as hell

`-s` or `--silent` Suppress log messages from output

`--help`           Show help
`--version`        Show version number


# Thanks
indexzero for the great and inspirational `http-server`

# Todos
* [ ] add ssl/https
