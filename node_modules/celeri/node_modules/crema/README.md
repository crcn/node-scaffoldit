 

## Example

```javascript
var routes = crema('request -method=GET OR -method=POST authorize -> login');
```

Output:

```javascript
[
  {
    "type": "request",
    "tags": {
      "method": "get"
    },
    "channel": {
      "value": "login",
      "paths": [
        {
          "value": "login",
          "param": false
        }
      ]
    },
    "thru": {
      "channel": {
        "value": "authorize",
        "paths": [
          {
            "value": "authorize",
            "param": false
          }
        ]
      }
    }
  }
]
```

## Syntax

```javascript
crema('type -tag=value route OR route2');
```


## Use Cases

- [beanpole](beanpole)
- [dolce](dolce)
