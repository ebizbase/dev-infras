#!/bin/bash

# trunk-ignore-all(shellcheck/SC2312)
set -e

CONFIG=${CONFIG:-'https://raw.githubusercontent.com/ebizbase/dev-infras/refs/heads/main/devcontainer-features/powerlevel10k/p10k.zsh'}
VERSION=${VERSION:-'latest'}
DELETE_PREINSTALL_THEMES=${DELETEPREINSTALLEDTHEMES:-false}
DEBUG=${DEBUG:-false}

debug() {
  if [[ ${DEBUG} == true ]]; then
    echo "$1" >>/tmp/powerlevel10k.log
  fi
}

if [[ -n ${_REMOTE_USER_HOME} ]]; then
  USER_HOME="${_REMOTE_USER_HOME}"
elif [[ ${_REMOTE_USER} == "root" ]]; then
  USER_HOME="/root"
# Check if user already has a home directory other than /home/${USERNAME}
elif [[ "/home/${_REMOTE_USER}" != $(getent passwd "${_REMOTE_USER}" | cut -d: -f6) ]]; then
  USER_HOME=$(getent passwd "${_REMOTE_USER}" | cut -d: -f6)
else
  USER_HOME="/home/${_REMOTE_USER}"
fi

if [[ ${VERSION} == "latest" ]]; then
  VERSION=$(curl --silent "https://api.github.com/repos/romkatv/powerlevel10k/releases/latest" | grep '"tag_name":' | sed -E 's/.*"v([^"]+)".*/\1/')
fi

debug "==============================="
debug "VERSION: ${VERSION}"
debug "CONFIG: ${CONFIG}"
debug "REMOTE_USER: ${_REMOTE_USER}"
debug "USER_HOME: ${USER_HOME}"
debug "==============================="

if [[ ${DELETE_PREINSTALL_THEMES} == true ]]; then
  debug "Deleting other themes"
  rm -rf "${USER_HOME}"/.oh-my-zsh/themes/*
fi

curl -L https://github.com/romkatv/powerlevel10k/archive/refs/tags/v"${VERSION}".zip -o /tmp/powerlevel10k.zip
unzip /tmp/powerlevel10k.zip -d /tmp
cp -r /tmp/powerlevel10k-"${VERSION}" "${USER_HOME}"/.oh-my-zsh/custom/themes/powerlevel10k
rm -rf /tmp/powerlevel10k.zip /tmp/powerlevel10k-"${VERSION}"
sed -i 's/ZSH_THEME=".*"/ZSH_THEME="powerlevel10k\/powerlevel10k"/g' "${USER_HOME}/.zshrc"
echo 'source ~/.oh-my-zsh/custom/themes/powerlevel10k/powerlevel10k.zsh-theme' >>"${USER_HOME}/.zshrc"
echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >>"${USER_HOME}/.zshrc"

curl -L "${CONFIG}" -o "${USER_HOME}/.p10k.zsh"
