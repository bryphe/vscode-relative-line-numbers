'use strict';
import * as vscode from 'vscode';
import * as path from "path";

var MAX_ICONS = 99;
var INTERVAL = 25; /* ms */
var intervalId = null;

export function activate(context: vscode.ExtensionContext) {
    if(intervalId !== null)
        return;

    var decorations: vscode.TextEditorDecorationType[] = createDecorations();

    // Is there a better way to handle this? Ideally, there'd be some sort of
    // cursor or selection move event we can hook into.
    intervalId = setInterval(() => {
        var editor = vscode.window.activeTextEditor;

        if (!editor)
            return;

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        var line = vscode.window.activeTextEditor.selection.active.line;
        var totalLines = vscode.window.activeTextEditor.document.lineCount;

        for (var delta = 1; delta < MAX_ICONS; delta++) {
            var rangesForDecoration: vscode.Range[] = [];

            // Check upwards
            if (line - delta >= 0) {
                rangesForDecoration.push(new vscode.Range(line - delta, 0, line - delta, 0));
            }

            // Check downwards
            if (line + delta < totalLines) {
                rangesForDecoration.push(new vscode.Range(line + delta, 0, line + delta, 0));
            }

            editor.setDecorations(decorations[delta - 1], rangesForDecoration);
        }
    }, INTERVAL);

}

function createDecorations(): vscode.TextEditorDecorationType[] {
    var ret = [];
    for (var i = 1; i < MAX_ICONS; i++) {
        ret.push(
            vscode.window.createTextEditorDecorationType(<any>{
                gutterIconPath: path.join(__dirname, "..", "..", "images", i.toString() + ".png"),
                gutterIconSize: "cover",
            })
        )
    }

    return ret;
}

// this method is called when your extension is deactivated
export function deactivate() {
    clearTimeout(intervalId);
    intervalId = null;
}