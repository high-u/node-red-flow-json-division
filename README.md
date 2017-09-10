# node-red-flow-json-division

## Feature

* Divide JSON in the clipboard and output it in a file.
* for git-repository.

## Description

```
flowjsondiv -c [Output filename] [Output directory]
```

## Install (As a command)

* from github

```
git clone https://github.com/high-u/node-red-flow-json-division.git
cd node-red-flow-json-division
npm install -g
```

* from npm

```
npm install -g node-red-flow-json-division
```

## Usage (As a command)

```
flowjsondiv -c flow.json ${HOME}/node-red/flow
```

## Usage (No Install)

* from github

```
git clone https://github.com/high-u/node-red-flow-json-division.git
cd node-red-flow-json-division
./flowjsondiv -c flow.json ${HOME}/node-red/flow
```

## Result

- Flow
  - ![flow](./screenshots/flow.png)

- Directory
  - ![directory](./screenshots/result.png)

## OS Support (Plan for the future)

* Mac
* Windows
* Linux
