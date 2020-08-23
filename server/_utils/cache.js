const NodeCache = require("node-cache")

const appCache = new NodeCache();

// if only key is given - get the keys value
// if a key and a ttl are given - set keys ttl
// if a key, ttl and value are given - set key with value and ttl

const cache = (key, ttl = -1, value = undefined,) => {
    if (value === undefined)
        if (appCache.has(key))
            return appCache.get(key);
        else if (ttl !== -1)
            return appCache.ttl(key, ttl);
        else
            return undefined
    else
        return appCache.set(key, value, ttl);

}

module.exports = cache 