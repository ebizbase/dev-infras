#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)
# trunk-ignore-all(shellcheck/SC2010)

set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/omz-plugin.log
check "git omz plugin should be active" grep -v '^#' ~/.zshrc | grep 'plugins=(.*)' | awk -F'[()]' '{print $2}' | grep -q 'git' || exit 1
check "all custom omz plugins should be deleted except zsh-syntax-highlighting" ls -lR ~/.oh-my-zsh/custom/plugins | grep -c ^d | grep -q '1' && ls -lR ~/.oh-my-zsh/custom/plugins | grep ^d | grep -q 'zsh-syntax-highlighting' || exit 1
check "all pre installed omz plugins should be deleted except git" ls -lR ~/.oh-my-zsh/plugins | grep -c ^d | grep -q '1' && ls -lR ~/.oh-my-zsh/plugins | grep ^d | grep -q 'git' || exit 1

reportResults
