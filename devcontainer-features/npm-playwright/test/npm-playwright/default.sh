#!/bin/bash

set -e

source dev-container-features-test-lib

check "LOG" cat /tmp/npm-playwright.log
check "Should have os dependencies" dpkg -l | grep xserver-common && dpkg -l | grep  x11-common  && dpkg -l | grep xvfb
check "Should browser binary avaiable in cache directory" ls -al /home/vscode/.cache/ms-playwright

reportResults
