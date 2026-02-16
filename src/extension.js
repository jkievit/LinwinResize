import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const TARGET_RATIO = 0.85;

function clampToMonitor(win) {
    const monitor = win.get_monitor();
    const area = global.workspace_manager
        .get_active_workspace()
        .get_work_area_for_monitor(monitor);

    const frame = win.get_frame_rect();
    const needsWidth = frame.width > area.width;
    const needsHeight = frame.height > area.height;

    if (!needsWidth && !needsHeight)
        return;

    const w = needsWidth ? Math.round(area.width * TARGET_RATIO) : frame.width;
    const h = needsHeight ? Math.round(area.height * TARGET_RATIO) : frame.height;
    const cx = area.x + Math.round((area.width - w) / 2);
    const cy = area.y + Math.round((area.height - h) / 2);

    win.move_resize_frame(false, cx, cy, w, h);
}

export default class LinwinResizeExtension extends Extension {
    enable() {
        this._sig = global.display.connect('grab-op-end', (_d, win) => {
            if (win)
                clampToMonitor(win);
        });
    }

    disable() {
        if (this._sig) {
            global.display.disconnect(this._sig);
            this._sig = null;
        }
    }
}
