#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)
set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/omz-plugin.log
check "verify omz-plugin is active" grep -v '^#' ~/.zshrc | grep 'plugins=(.*)' | awk -F'[()]' '{print $2}' | grep -q 'git'

reportResults
