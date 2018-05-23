
let toString = Object.prototype.toString;
let isArray = Array.isArray;

const utils = {

    isObject(o) {
        return toString.call(o) === '[object Object]';
    },

    isArray(a) {
        return isArray(a);
    },

    ensureArray(o) {
        if (utils.isArray(o)) return o;
        return o === null || o === undefined ? [] : [o];
    },

    hasOwn(o, prop) {
        return o && typeof o.hasOwnProperty === 'function' && o.hasOwnProperty(prop);
    },

    hasMember(a, index) {
        return a && a[index] !== undefined
    },

    deepCopy(object) {
        if (utils.isArray(object)) {
            let a, i,
                copy = [];
            for (i of object) {
                copy.push(utils.deepCopy(i))
            }
            return copy;
        } else if (utils.isObject(object)) {
            let k, o,
                copy = {};
            for (k in object) {
                if (utils.hasOwn(object, k)) {
                    o = object[k];
                    copy[k] = utils.deepCopy(o);
                }
            }
            return copy;
        } else {
            return object;
        }
    },

    // iterates over elements of an array, executing the callback for each
    // element.
    each(array, callback, thisArg) {
        let length = array.length,
            index = -1;
        while (++index < length) {
            if (callback.call(thisArg, array[index], index, array) === false) break;
        }
    },

    eachRight(array, callback) {
        let index = array.length;
        while (index--) {
            if (callback(array[index], index, array) === false) break;
        }
    },

    // Borrowed from http://phpjs.org/functions/preg_quote
    pregQuote(str, delimiter) {
        return String(str)
            .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
    },

    stringOrArrayOf(o, value) {
        return (typeof o === 'string' && o === value)
            || (utils.isArray(o) && o.length === 1 && o[0] === value);
    },

    hasSingleItemOf(arr, itemValue) {
        return arr.length === 1
            && (arguments.length === 2 ? arr[0] === itemValue : true);
    }

};

export default utils;
