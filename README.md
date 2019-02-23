# About

React application that allows to create form template, validate answers and export completed form to JSON.

# Requirements

* docker
* docker-compose
* make

# Installation

All comands should be execute from root folder

Run make command to create application:
`make up`

Run make command to stop docker containers:
`make down`

Run make command to clean workspace:
`make clean-docker`

# Results

Application output locates in /app/dist folder. Webpack (runs in docker container) creates builder.js bundle which included in index.html template. builder.config.js file is used for configure and render FormBuilder.

# How to use

## Interfaces
FormBuilder has interfaces that provide opportunity to set up mounting point where to render the component, endpoint URL for extracting and submitting data, specify desired headers and so on. Look at list below:
* `setMountPoint(id)` - use it to set up mounting point;
* `setUrl(url)` - use it to specify back-end endpoint;
* `setHeaders(headers)` - use it to specify custom headers, such as CSRF token;
* `setEditMode(bool)` - use it to switch between construction and preview mode. In construction mode you can manipulate with Form content (add, remove, edit or replace questions). In preview mode Form only submits provided answers; 
* `setInputSerializer(func)` - use it to pass function that will transform data from your endpoint into FormBuilder component format;
* `setOutputSerializer(func)` - use it to pass function that will transform data from FormBuilder component format into expecting format;
* `getConfigs()` - returns JSON object with current configs;
* `getItemTypes()` - returns JSON object with existing FormBuilder items types;
* `getValidationTypes()` - returns JSON object with existing FormBuilder validator types and patterns;
* `getItemTemplate()` - returns JSON object that represents FormBuilder item template with explanation of each field;
* `renderFormBuilder()` - main interface function that creating FormBuilder component with provided configs.

Notice. Keep in mind that you must provide all necessary config before component rendering.

## Minimal set up
To achieve minimal sandbox FormBuilder functionality you need to provide mount point settings and enable edit mode. For this purpose we use config file with content:

`document.addEventListener('DOMContentLoaded', function(event) {
  setMountPoint("app");
  setEditMode(true);
  renderFormBuilder();
});`