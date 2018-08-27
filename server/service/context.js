import utils from '../utils/index';
import common from '../utils/common';
import commonMD from '../model/common';
import config from '../../config';
import source from '../../config/static';
import ejser from './ejser';
import asset from './asset';

// --------------------------- koa context
export default async function (app) {
    app.context.asset = asset[String(process.env.NODE_ENV).trim() || 'development'];
    app.context.render = ejser({
        root: 'view/default', // -------- 模板根目录
        cache: false, // ----------------- 是否缓存
        viewExt: 'ejs', // -------------- 模板后缀
        debug: false, // ---------------- Debug模式
        method: 'memory', // ------------ 读取模板的方式，可选值 stream file  memory
        writeResp: true, // ------------- 是否写入到 TCP Handler -> Response中
        _with: false, // ---------------- 关闭with
        localsName: 'locals', // -------- 本地变量
        locals: { // -------------------- 传递到模板中的变量
            indexData: {
                openwindow: 0
            },
            menu: await commonMD.getNavMenu(),
            hotSerach: await commonMD.getHotSearch(),
            showpager: common.showpager,
            _config: config,
            utils,
            STATIC_SOURCE_URI: source.uri[source.current]
        }
    });
}
