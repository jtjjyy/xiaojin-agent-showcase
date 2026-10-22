module.exports = {
  extends: './electron-builder.yml',
  mac: {
    target: ['dmg', 'zip'],
    identity: null,
    artifactName:
      'XiaoJin-Agent-${version}-UNSIGNED-PREVIEW-macos-${arch}.${ext}',
  },
  win: {
    target: ['nsis'],
    artifactName:
      'XiaoJin-Agent-${version}-UNSIGNED-PREVIEW-windows-${arch}.${ext}',
  },
  linux: {
    target: ['AppImage', 'deb'],
    artifactName: 'XiaoJin-Agent-${version}-UNSIGNED-PREVIEW-linux-x64.${ext}',
    maintainer: 'XiaoJin Agent maintainers',
    vendor: 'XiaoJin Agent',
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
  },
}
