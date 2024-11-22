#!/usr/bin/env bash
set -e
# trunk-ignore-all(shellcheck/SC2312)

PACKAGES=${PACKAGES:-""}

# Clean up
rm -rf /var/lib/apt/lists/*

if [[ -z ${PACKAGES} ]]; then
  echo -e "'packages' variable is empty, skipping"
  exit 0
fi

if [[ "$(id -u)" -ne 0 ]]; then
  echo -e 'Script must be run as
    root. Use sudo, su, or add "USER root" to your Dockerfile before running this script.'
  exit 1
fi

PACKAGES=$(echo "${PACKAGES}" | tr ',' ' ')
npm install -g "${PACKAGES}"
