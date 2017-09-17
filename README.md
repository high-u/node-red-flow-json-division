# node-red-flow-json-division

## Released

|Date|Version|Description|
|:--:|:-----:|:----------|
|2017-09-17|0.5.3|Supported Windows and add added `check` parameter.|

## Feature

* Manage Node-RED's JSON with git.
* Divide JSON in the clipboard and output it in a file.
* Divide by node.
* `flow.json` has the clipboard as it is.
* for git-repository.
* Supported
  * Mac
  * Windows

## Description

* Output JSON from clipboard.

```
flowjsondiv [Output directory]
```

* Output JSON from clipboard.

```
flowjsondiv [Output directory] [input file path]
```

* Check Clipboard.

```
flowjsondiv check
```

## Install (As a command)

```
npm install -g node-red-flow-json-division
```

## Usage (As a command)

* Mac

```bash
# from clipboard.
flowjsondiv ${HOME}/node-red/flow
# from file.
flowjsondiv ${HOME}/node-red/flow ${HOME}/flows.json
# watch the content of the clipboard.
flowjsondiv check
```

* Windows

```bat
rem from clipboard.
flowjsondiv %HOMEPATH%¥node-red¥flow
rem from file.
flowjsondiv %HOMEPATH%¥node-red¥flow %HOMEPATH%¥flow.json
rem watch the content of the clipboard.
flowjsondiv check
```

## Usage (No Install)

```
git clone https://github.com/high-u/node-red-flow-json-division.git
cd node-red-flow-json-division
./flowjsondiv ${HOME}/node-red/flow
```

## Result

- Flow
  - ![flow](./screenshots/flow.png)

- Directory
  - ![directory](./screenshots/result.png)

## OS Support (Plan for the future)

* Mac
* Windows
* ~~Linux~~

