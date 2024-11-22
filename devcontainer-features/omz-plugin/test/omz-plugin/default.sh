#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)

set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/omz-plugin.log
check "git omz plugin should be active" grep -v '^#' ~/.zshrc | grep 'plugins=(.*)' | awk -F'[()]' '{print $2}' | grep -q 'git' && true || exit 1

reportResults
