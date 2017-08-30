// name values
const availableOptions = [
  'tab-preview',
];

const optionsForm = document.querySelector('#options');

function selectInput(name, value) {
  return document.querySelector(`input[name=${name}][value=${value}]`);
}

function selectOptionValue(formName) {
  const inputs = [...document.querySelectorAll(`input[name=${formName}`)];
  // This probably only works for values we can check
  const { value } = inputs.filter(({ checked }) => checked)[0];
  return value;
}

function saveOptions(event) {
  event.preventDefault();
  availableOptions.forEach(name => {
    browser.storage.sync.set({
      [name]: selectOptionValue(name),
    });
  });
}

// Grab options from storage and set them to values
// Debugging:
//  (1) Go to addons preferences
//  (2) Open debug tools
//  (3) Select the extensions iframe with the 3-rectangle icon in the top-right
//      while the addons preferences page is loaded.
function doRestoreOptions(opts) {
  const optNodes = Object.keys(opts).map(key => selectInput(key, opts[key]));
  optNodes.forEach((node) => {
    node.setAttribute('checked', 'true');
  });
}

function restoreOptions() {
  // Grab all the options, describe theme here
  browser.storage.sync.get({
    'tab-preview': 'favicon',
  })
    .then(doRestoreOptions)
    .catch(console.error);
}

// Get the stored options if they exist and set each
function getOptionsObject(optionsArray) {
  const optionsObject = {};
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.forms[0].addEventListener('submit', saveOptions);
document.querySelector('button', e => e.preventDefault());
