import path from 'path';
import fs from 'fs';
import MemoryFS from 'memory-fs';

export function makeMemoryFS (viewroot) {
    const databufs = Buffer.from('0');
    const fsm = new MemoryFS(databufs);

    function iteration (paths, callback) {
        paths = path.normalize(paths);
        const stat = fs.statSync(paths);

        if (stat.isFile()) {
            callback.file(paths);
        } else if (stat.isDirectory()) {
            callback.dirs(paths);
            fs.readdirSync(paths).forEach(v => iteration(paths + '/' + v, callback));
        }
    }

    fsm.mkdirpSync(viewroot);
    iteration(viewroot, {
        file: function (paths) {
            const content = fs.readFileSync(paths);

            fsm.writeFileSync(paths, content);
        },
        dirs: function (paths) {
            if (paths !== viewroot) {
                fsm.mkdirSync(paths);
            }
        }
    });

    return fsm;
}
