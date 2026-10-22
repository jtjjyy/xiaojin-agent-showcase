# ============================================================
#  小金 Agent - 本地开发启动脚本 (PowerShell)
#  用法：pwsh -File .\start-dev.ps1
# ============================================================

# 某些环境会注入 ELECTRON_RUN_AS_NODE=1，会让 Electron 退化成纯 Node 运行时，
# 表现为 "does not provide an export named 'BaseWindow'"。必须清除。
Remove-Item Env:\ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue

$repo = $PSScriptRoot
$desktop = Join-Path $repo 'desktop'

if (-not (Test-Path $desktop)) {
    Write-Error "找不到 desktop 目录：$desktop"
    exit 1
}

$electronExe = Join-Path $desktop 'node_modules\electron\dist\electron.exe'
if (-not (Test-Path $electronExe)) {
    Write-Error "Electron 运行时缺失：$electronExe`n请先在仓库根目录和 desktop 目录分别执行 npm install，并确认 Electron 二进制下载成功。"
    exit 1
}

Write-Host '============================================================'
Write-Host ' 启动小金 Agent 开发版...'
Write-Host ' 渲染进程开发服务器：http://127.0.0.1:5173/'
Write-Host ' 关闭窗口或按 Ctrl+C 结束。'
Write-Host '============================================================'
Write-Host ''

Push-Location $desktop
try {
    npm run dev
}
finally {
    Pop-Location
}
