#!/usr/bin/env bash
set -e

DEBUG=${DEBUG:-false}

debug() {
  if [[ ${DEBUG} == true ]]; then
    echo "$1" >> /tmp/npm-playwright.log
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

debug "==============================="
debug "REMOTE_USER: ${_REMOTE_USER}"
debug "USER_GROUP: ${_REMOTE_USER}"
debug "USER_HOME: ${USER_HOME}"
debug "==============================="

PLAYWRIGHT_BROWSERS_PATH="${USER_HOME}/.cache/ms-playwright" npx --yes playwright install --with-deps
chown -R ${_REMOTE_USER}:${_REMOTE_USER} "${USER_HOME}/.cache"
