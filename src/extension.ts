'use strict';
import * as vscode from 'vscode';
import * as path from "path";

var MAX_ICONS = 99;

export function activate(context: vscode.ExtensionContext) {
    var decorations: vscode.TextEditorDecorationType[] = createDecorations();
    var isExtensionEnabled = true;

    vscode.commands.registerCommand("extension.relativeLineNumbersEnable", () => {
        isExtensionEnabled = true;
        setRelativeLineDecorations()
    });

    vscode.commands.registerCommand("extension.relativeLineNumbersDisable", () => {
        isExtensionEnabled = false;
        clearRelativeLineDecorations();
    });

    vscode.window.onDidChangeTextEditorSelection((e: vscode.TextEditorSelectionChangeEvent) => {
        if (!isExtensionEnabled)
            return;

        setRelativeLineDecorations();
    });

    function setRelativeLineDecorations(): void {
        var editor = vscode.window.activeTextEditor;

        if (!editor)
            return;

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        var line = editor.selection.active.line;
        var totalLines = editor.document.lineCount;

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
    }

    function clearRelativeLineDecorations(): void {
        var editor = vscode.window.activeTextEditor;

        if (!editor)
            return;

        decorations.forEach((d) => {
            editor.setDecorations(d, []);
        });
    }
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

}