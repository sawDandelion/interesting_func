const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
console.log(objectToQueryString({name: 'Jhon', age: 18, address: 'beijing'}))
