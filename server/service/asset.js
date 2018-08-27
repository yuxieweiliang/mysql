// import config from '../../config/server'
import source from '../../config/static';
const env = String(process.env.NODE_ENV).trim() || 'development';
const assetJson = require('../../.config/' + env + '-asset.json');
const prefix = source.prefix;
const cached = {};

export default {
    production(arr) {
        arr = [].concat(arr);
        const cacheKey = arr.join('-');

        if (Reflect.has(cached, cacheKey)) {
            return cached[cacheKey];
        }
        if (arr.indexOf('read') === -1) {
            arr.push('style');
        }
        const result = {
            compat: [].concat(assetJson.compat).map(v => prefix + v)
        };

        for (const name of arr) {
            if (Reflect.has(assetJson, name)) {
                const asset = assetJson[name];

                for (const kind in asset) {
                    const kindAsset = [].concat(asset[kind]).map(v => prefix + v);

                    if (Reflect.has(result, kind)) {
                        result[kind] = result[kind].concat(kindAsset);
                    }else {
                        result[kind] = kindAsset;
                    }
                }
            }
        }

        return cached[cacheKey] = result;
    },

    development(arr) {
        arr = [].concat(arr);
        arr.push('style');

        const result = {
            js: [],
            css: [],
            compat: assetJson.compat
        };

        for (const name of arr) {
            Reflect.has(assetJson, name) && result.js.push('/' + assetJson[name]);
        }

        return result;
    }
};
