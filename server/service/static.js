/**
 * @description
 * 1. 配置项 hidden 隐藏文件不能访问
 * 2. 配置项 gzip 是否开启gzip压缩
 * 3. 配置项 brotli 是否开启Brotli压缩算法,不能与gzip共存，优先选择brotli
 * 4. 配置项 setHeaders 设置response.headers
 * 5. 配置项 notFound 不存在时的处理
 * 6. 配置项 root 资源根目录
 * 7. 配置项 filter 针对特指资源访问的过滤器
 * 8. 配置项 prefix 资源url前缀
 * */

import fs from 'fs';
import {
    normalize,
    basename,
    extname,
    resolve,
    join,
    sep
} from 'path';
import assert from 'assert';
import debugs from 'debug';

const debug = debugs('static:server');

// Promise fs.stat
function fsStat(path) {
    return new Promise(function (res, rej) {
        fs.stat(path, function (err, stat) {
            if (err) {
                rej(err);
            } else {
                res(stat);
            }
        });
    });
}

// Promise fs.exists
function fsExists(path) {
    return new Promise(function (resolve) {
        // console.log('fs.exists ---- ' + path)
        fs.exists(path, exists => resolve(exists));
    });
}

/**
 * Check if it's hidden.
 */
function isHidden(root, path) {
    path = path.substr(root.length).split(sep);
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] === '.') {
            return true;
        }
    }

    return false;
}

/**
 * File not Found
 */
function notFound(ctx) {
    ctx.status = 404;
    ctx.body = null;
}

/**
 * File type.
 */
function type(file, ext) {
    return ext !== '' ? extname(basename(file, ext)) : extname(file);
}

/**
 * 读取静态文件
 *
 * @param {Context} ctx
 * @param {String} path
 * @param {Object} [opts]
 * @return {Function}
 * @api public
 */
async function send(ctx, opts = {}) {
    assert(ctx, 'koa context required');

    let path = ctx.path;
    const { root ,brotli,hidden ,gzip, setHeaders ,notFounded } = opts; // hidden

    path = join(root, path);

    if (!hidden && isHidden(root, path)) {
        throw ctx.throw(405, 'Cannot read hidden files.');
    }

    let ext = '';
    const original = path;

    if ( gzip && ctx.acceptsEncodings('gzip', 'deflate', 'identify') === 'gzip') {
        ctx.set('Content-Encoding', 'gzip');
        path = path + '.gz';
        ext = '.gz';
    }else if (brotli && ctx.acceptsEncodings('br', 'deflate', 'identity') === 'br' ) {
        ctx.set('Content-Encoding', 'br');
        path = path + '.br';
        ext = '.br';
    }

    const isExisted = await fsExists(path);

    if (!isExisted && ext !== '') {
        if (await fsExists(original)) {
            ctx.res.removeHeader('Content-Encoding');
            path = original;
        }else{

            return notFounded(ctx);
        }
    }

    let stats;

    try {
        stats = await fsStat(path);
        if (stats.isDirectory()) {
            throw Error('This is a folder.');
        }
    } catch (err) {
        return notFounded(ctx,err);
    }

    if (setHeaders) {
        setHeaders(ctx, stats);
    }
    ctx.type = type(path, ext);
    ctx.body = fs.createReadStream(path);

    return true;
}

/**
 * 静态资源服务器
 *
 * @param {String} root
 * @param {Object} [opts]
 * @return {Function}
 */
export default function (root, opts) {
    opts = Object.assign({}, opts);

    assert(root, '根目录是必须的！');
    debug('static serve : "%s" %j', root, opts);

    opts.root = normalize(resolve(root)) || './';
    opts.prefix = opts.prefix || '/';
    opts.hidden = opts.hidden === true;
    opts.brotli = opts.brotli === true;
    opts.gzip = opts.gzip === true;

    if (opts.setHeaders && typeof opts.setHeaders !== 'function') {
        throw new TypeError('配置项 setHeaders  必须是一个函数');
    }

    if (typeof opts.notFounded !== 'function') {
        opts.notFounded = notFound;
    }

    return async function (ctx, next) {
        // ctx.path = decodeURIComponent(ctx.path);
        // if (ctx.path === -1) {
        //     return ctx.throw(400, 'failed to decode');
        // }
        if (ctx.path.startsWith(opts.prefix)) {
            debug('读取静态资源中 ... !');
            if (ctx.method === 'HEAD' || ctx.method === 'GET') {
                try {
                    ctx.path = ctx.path.replace(opts.prefix, '');

                    await send(ctx, opts);
                } catch (err) {

                    if (err.status !== 404) {
                        throw err;
                    }

                    return opts.notFounded(ctx,err);
                }
            }
        } else {
            return next();
        }
    };
}
