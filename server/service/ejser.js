/* eslint no-console: 0 */
/* eslint prefer-reflect : 0*/
/* eslint no-invalid-this: 0*/
import fs from 'fs';
import path from 'path';
import LRU from 'lru-cache';
import ejs from 'ejs';
import pretty from 'pretty';
import {
    minify
} from 'html-minifier';
import {
    makeMemoryFS
} from './memory-view';

/**
 * 读写流方式渲染模板
 *
 * @export
 * @param {string} src
 * @returns
 */

export function stream(src) {
    return new Promise((resolve, reject) => {
        try {
            const tpl = [];
            const rstream = fs.createReadStream(src);

            rstream.on('end', () => rstream.close());
            rstream.on('close', () => resolve(tpl.join('')));
            rstream.on('data', (chunk) => {
                const chunks = chunk.toString();

                tpl.push(chunks);
            });
        } catch (error) {
            reject(error);
        }
    });
}

/**
 * 文件方式读取模板
 */
export function readFile(viewPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(viewPath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * 模板函数的默认配置
 * @type {Object}
 */
const defaultSettings = {
    cache: true, // --------- 是否缓存
    viewExt: 'html', // ----- 模板后缀
    debug: false, // -------- Debug模式
    locals: {}, // ---------- 传递到模板中的变量、函数
    method: 'memory', // ---- 读取模板的方式，可选值 stream file memory
    writeResp: true, // ----- 是否写入到 TCP Handler -> Response中
    layout: 'layout', // ---- 布局模板
    pretty: false, // ------- HTML结果格式化
    minify: true, // ------- HTML结果压缩
    minifyOption: {
			collapseWhitespace: true,
			// conservativeCollapse: true,
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true,
			minifyCSS: true
    },
    callback: () => true //-- 渲染结束后回调，在将渲染好的HTML发送到客户端之前，执行一个回调
};

/**
 * 作为koa2中间件使用
 *
 * @export
 * @param {object} settings
 */
export default function (settings) {
    if (!settings || !settings.root) {
        throw new Error('请指定模板文件根目录');
    }

    settings = Object.assign({}, defaultSettings, settings);
    settings.root = path.resolve(process.cwd(), settings.root);
    settings.viewExt = '.' + (settings.viewExt ? settings.viewExt : 'ejs');
    if (typeof settings.callback !== 'function') {
        settings.callback = () => true;
    }
    let fso = {
        readFileSync: stream
    };

    if (settings.method === 'file') {
        fso.readFileSync = readFile;
    } else if (settings.method === 'memory') {

        fso = makeMemoryFS(settings.root);

        ejs.fileLoader = function (filepath) {

            return fso.readFileSync(filepath, 'utf8');
        };

    }
    const lruCache = new LRU({
        max: 50
    });

    ejs.localsName = settings.localsName;

    return async function render(view, options) {
        let tplPath = path.join(settings.root, view + settings.viewExt),
            parsedHtml, cacheKey;

        if (settings.cache) {
            cacheKey = this.method + this.url + JSON.stringify(this.query) + '/' + view;
            parsedHtml = lruCache.get(cacheKey);
        }

        if (!parsedHtml) {
            options = Object.assign({}, settings.locals, this.state, options);

            const compileOptions = {
                filename: tplPath,
                cache: settings.cache, // 关闭ejs的缓存机制
                _with: settings._with,
                debug: settings.debug,
                compileDebug: settings.debug && settings.compileDebug,
                delimiter: settings.delimiter,
                root: settings.root
            };
            let tpl = await fso.readFileSync(tplPath, 'utf8'),
                pager = ejs.compile(tpl, compileOptions);
            const layout = options.layout === false ? false : options.layout || settings.layout;

            parsedHtml = pager(options);

            if (layout) {
                options.body = parsedHtml;
                tplPath = path.join(settings.root, layout + settings.viewExt);
                tpl = null;
                pager = null;
                tpl = await fso.readFileSync(tplPath, 'utf8');
                compileOptions.filename = tplPath + '?' + new Date().getTime();
                pager = ejs.compile(tpl, compileOptions);
                parsedHtml = pager(options);
            }

            if (settings.pretty) {
                parsedHtml = pretty(parsedHtml);
            } else if (settings.minify) {
                // fs.writeFileSync('.config/0000000.html', parsedHtml);
                // console.log('minify');
                parsedHtml = minify(parsedHtml, settings.minifyOption);
            }

            // fs.writeFileSync('./000000000000.html', parsedHtml);

            if (settings.cache) {
                lruCache.set(cacheKey, parsedHtml);
            }

            tpl = null;
            pager = null;
        }
        const callback = typeof options.callback === 'function' ? options.callback : settings.callback;
        const callbacked = await callback(parsedHtml, this);

        if (!callbacked) {
            return;
        }

        const writeResp = options.writeResp === false ? false : options.writeResp || settings.writeResp;

        if (writeResp) {
            this.status = 200;
            this.type = 'html';
            this.body = parsedHtml;

            return;
        }

        return parsedHtml;
    };
}
