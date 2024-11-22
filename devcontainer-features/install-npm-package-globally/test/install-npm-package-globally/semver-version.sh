#!/bin/bash
# trunk-ignore-all(shellcheck/SC2312)

# This test file will be executed against one of the scenarios devcontainer.json test that
# includes the 'color' feature with "greeting": "hello" option.

set -e

# Optional: Import test library bundled with the devcontainer CLI
source dev-container-features-test-lib

# Feature-specific tests
# The 'check' command comes from the dev-container-features-test-lib.

check "Checking ts-node avaiable" ts-node --version
check "Checking ts-node version must satisfy semver" ts-node --version | grep -q "v8.10.*"
check "Checking ts-node version must not v8.10.0" ts-node --version | grep -q "v8.10.0" && exit 0 || exit 1

# Report results
# If any of the checks above exited with a non-zero exit code, the test will fail.
reportResults
