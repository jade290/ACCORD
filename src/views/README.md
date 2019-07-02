<!-- src/views/README.md -->

# views dir

to add a 'view' or 'page' to the app, define the view in this `views` directory, and then add that view to the views registry at `~/src/views/index.js`.

the app's dynamic router and navbar are rendered from this views registry.

## structure of views director 

```
- views 
  - index.js // views registry which exports views to app 
  - Home // component folder for home page 
    - index.js // react component for home page 
    - Home.test.js // unit test file 
    - style.css // stylesheet for home page 
  - NotFound // component folder for unresolved view page 
    - index.js // react component for unresolved view page 
    - NotFound.test.js // unit test file
    - style.css // stylesheet for unresolved view page
```