# LinwinResize

A GNOME Shell extension that automatically clamps oversized windows to fit the current monitor. Useful for multi-monitor setups where dragging a window between screens of different resolutions leaves it overflowing the target display.

## What it does

When you finish dragging or resizing a window, LinwinResize checks whether the window exceeds the monitor's work area (the usable screen space minus panels and docks). If the window is too wide, too tall, or both, it is scaled down to 85% of the available space and centered on the monitor.

Windows that already fit are left untouched.

## How it works

- Connects to the `grab-op-end` signal on `Meta.Display`, which fires whenever a window move or resize operation completes.
- Compares the window's frame rectangle against the work area for its current monitor, obtained via the workspace manager API.
- Any overflowing dimension is clamped to 85% of the work area, and the window is repositioned to the center of the monitor in a single `move_resize_frame` call.
- On disable, the signal handler is cleanly disconnected.

## Compatibility

| GNOME Shell | Status    |
|-------------|-----------|
| 45          | Supported |
| 46          | Supported |
| 47          | Supported |

Uses the ESModules extension API introduced in GNOME 45. Not compatible with GNOME 44 or earlier.

## Installation

```sh
cd src
zip ../linwinresize.zip extension.js metadata.json
gnome-extensions install --force ../linwinresize.zip
```

Then restart GNOME Shell (X11: `Alt+F2` > `r` > Enter, or log out and back in on Wayland) and enable:

```sh
gnome-extensions enable linwinresize@9f79d7d0-5d2f-445b-8531-db32d902c29f
```

## Authorship

The code for this extension was written by Anthropic's Claude Code, under instruction of, and tested by, humans.

## License

GPL-2.0
