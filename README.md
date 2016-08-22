# vscode-relative-line-numbers

![demo](http://i.imgur.com/AZxJCty.gif)

vscode-relative-line-numbers is a simple Visual Studio Code extension that adds relative line numbers to Visual Studio Code.

This is useful if you are using one of the VIM plugins - ie, [VSCodeVim](#https://github.com/VSCodeVim/Vim)

## Install

- Open the command palette in Visual Studio Code (`Ctrl-Shift-P` or `Cmd-Shift-P`)
- Select `Install Extension` and search for 'Relative line numbers'

## Source

[Github](https://github.com/extr0py/vscode-relative-line-numbers)


## Issues

The Visual Studio Code API doesn't support a great way to add this functionality. It does expose a way to add 'gutter images', which is how this plugin adds the relative line numbers, but it breaks other functionality that uses the gutter images.

It'd be great to at least minimize the issues in other scenarios - for example, only enabling this in non-debug modes. Any feedback or ideas are appreciated.

The images are generated using `phantomjs` by a the generate-images.js file. You can modify that file to change the styling, and run `npm run generate-images` to generate a new set of images.

## License

MIT License
