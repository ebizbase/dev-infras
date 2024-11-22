#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)
set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/omz-plugin.log
check "checking active omz-plugin" grep -v '^#' ~/.zshrc | grep 'plugins=(.*)' | awk -F'[()]' '{print $2}' | grep -q 'zsh-syntax-highlighting zsh-autosuggestions' || exit 1
check "plugins zsh-syntax-highlighting sbould be installed" test -f ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh || exit 1
check "plugins zsh-autosuggestions sbould be installed" test -f ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh || exit 1

# check "plugin example sbould be removed" test -f ~/.oh-my-zsh/custom/plugins/example/example.plugin.zsh && exit 1

# check "plugins zsh-syntax-highlighting sbould be installed" test -f ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh || exit 1
# check "plugins zsh-autosuggestions sbould be installed" ls -l ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
# check "should keep git omz-plugins" ls -A ~/.oh-my-zsh/plugins | grep -q 'git' && exit 1 || true
# check "should keep git-auto-fetch omz-plugins" ls -A ~/.oh-my-zsh/plugins | grep -q 'git-auto-fetch' && exit 1 || true

reportResults
