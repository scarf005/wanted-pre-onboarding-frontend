```sh
xh 'https://raw.githubusercontent.com/walking-sunset/selection-task/master/README.md' |  rg 'data-testid=(".*")'  -o --replace '$1'
```
