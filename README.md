# Stylus hover repro (Chrome on Android)

Minimal test page for a Chromium bug: on Android, after the file chooser is opened
(or after switching to/from the page installed as an app), the tab stops receiving
stylus hover events for good.

**Page:** https://sonystone.github.io/stylus-hover-repro/

The page shows whether pen hover (`pointermove` with `pointerType=pen`, `buttons=0`)
is being received, a circle that follows the pen, a log of the last pointer events
and two buttons with a visible `:hover` style. No build, no dependencies.

## Steps to reproduce

A. File chooser

1. Open the page in Chrome on an Android tablet with a hovering stylus.
2. Hover the stylus over the gray area: the indicator says "receiving".
3. Tap "Step 2: open the file chooser, then cancel it" and cancel the picker
   (picking a file has the same effect).
4. Hover again: the indicator says "NOT received since N s".

B. Installed app

1. Chrome menu → Add to home screen → Install. In the installed app hover is never received.
2. Switching between the installed app and the page in a Chrome tab also breaks hover in the tab.

**Expected:** hover `pointermove` events keep arriving.

**Actual:** no hover events in this tab any more. The pen appears only on contact
(`pointerover` + `pointerdown` together, `pointerout` + `pointerleave` with
`relatedTarget=null` on every lift), each contact gets a new `pointerId`, and the
element that was under the pen stays in `:hover`. Reload does not help; a new tab does.
Switching apps through the Recents screen does not trigger it.

Observed on Wacom MovinkPad Pro 14, Android 15, Chrome 155.0.8059.39 and Chrome Canary.

## Related

- https://issues.chromium.org/issues/40283585 — Hover events not consistently sent (closed as Obsolete)
- https://issues.chromium.org/issues/40285394 — new pointerId for every pen contact
