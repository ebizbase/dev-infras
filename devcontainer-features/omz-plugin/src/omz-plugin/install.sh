#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)
set -e

PRE_INSTALLED_PLUGINS=${PREINSTALLEDPLUGINS:-'git,git-auto-fetch'}
CUSTOM_PLUGINS=${CUSTOMPLUGINS:-''}
ACTIVE_PLUGINS=()
DELETE_INACTIVE=${DELETEINACTIVE:-false}
DEBUG=${DEBUG:-false}

debug() {
  if [[ ${DEBUG} == true ]]; then
    echo "$1" >>/tmp/omz-plugin.log
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
debug "PRE_INSTALLED_PLUGINS: ${PRE_INSTALLED_PLUGINS}"
debug "CUSTOM_PLUGINS: ${CUSTOM_PLUGINS}"
debug "REMOTE_USER: ${_REMOTE_USER}"
debug "USER_HOME: ${USER_HOME}"
debug "==============================="

IFS=',' read -r -a plugins_array <<<"${CUSTOM_PLUGINS}"
for plugin in "${plugins_array[@]}"; do
  name=$(echo "${plugin}" | cut -d':' -f1)
  url=$(echo "${plugin}" | cut -d':' -f2-)
  debug " - Installing plugin: ${name} from ${url}"
  plugin_dir="${USER_HOME}/.oh-my-zsh/custom/plugins/${name}"
  mkdir -p "${plugin_dir}"
  debug "    - Plugin directory: ${plugin_dir}"

  if [[ ${url} == *.git ]]; then
    debug "    - Cloning plugin from git"
    git clone --depth=1 "${url}" "${plugin_dir}"
  elif [[ ${url} == *.zip ]]; then
    debug "    - Downloading plugin from zip"
    curl -L "${url}" -o /tmp/plugin.zip
    zip_content=$(unzip -Z1 /tmp/plugin.zip)
    base_dir=$(echo "${zip_content}" | head -n 1)
    unzip /tmp/plugin.zip -d /tmp/plugin
    mv /tmp/plugin/"${base_dir}"/* "${plugin_dir}/"
    rm /tmp/plugin.zip
    rm -r /tmp/plugin
  else
    echo "Unsupported URL format: ${url}"
    exit 1
  fi

  ACTIVE_PLUGINS+=("${name}")
done

IFS=',' read -r -a plugins_array <<<"${PRE_INSTALLED_PLUGINS}"
for plugin in "${plugins_array[@]}"; do
  ACTIVE_PLUGINS+=("${plugin}")
done

ACTIVE_PLUGINS_STRING=$(printf " %s" "${ACTIVE_PLUGINS[@]}")

sed -i "s/plugins=(.*)/plugins=(${ACTIVE_PLUGINS_STRING:1})/g" "${USER_HOME}/.zshrc"

if [[ ${DELETE_INACTIVE} == false ]]; then
  exit 0
fi

PLUGINS_DIRS=("${USER_HOME}/.oh-my-zsh/custom/plugins" "${USER_HOME}/.oh-my-zsh/plugins")
for PLUGIN_DIR in "${PLUGINS_DIRS[@]}"; do
  debug "Checking for inactive plugins in ${PLUGIN_DIR}"
  for dir in "${PLUGIN_DIR}"/*; do
    debug " - Checking plugin: ${dir}"
    dir_name=$(basename "${dir}")
    debug "    - Plugin name: ${dir_name}"
    # Kiểm tra xem dir_name có nằm trong mảng ACTIVE_PLUGINS không
    should_delete=true
    for active_plugin in "${ACTIVE_PLUGINS[@]}"; do
      if [[ ${active_plugin} == "${dir_name}" ]]; then
        should_delete=false
        break
      fi
    done
    debug "    - Should delete: ${should_delete}"
    if [[ ${should_delete} == true ]]; then
      debug "    - Deleting plugin: ${dir}"
      rm -rf "${dir}"
    fi
  done
done
