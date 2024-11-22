#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)

set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/powerlevel10k.log
check "checking active omz theme" grep -v '^#' ~/.zshrc | grep 'ZSH_THEME=".*"' | awk -F'[""]' '{print $2}' | grep -q 'powerlevel10k/powerlevel10k'
check "powerlevel10k config file should exist" test -f ~/.p10k.zsh
check "powerlevel10k config file should contain '8-color lean prompt style' string in first line" head -n 1 ~/.p10k.zsh | grep -q '8-color lean prompt style'
check "should source powerlevel10k theme" grep -q 'source ~/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme' ~/.zshrc
check "should source config if exists" grep -q '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' ~/.zshrc
check "powerlevel10k should installed" test -f ~/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme

reportResults
