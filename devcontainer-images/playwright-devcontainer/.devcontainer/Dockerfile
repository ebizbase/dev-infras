# trunk-ignore-all(trivy/DS002)
# trunk-ignore-all(trivy/DS026)
# trunk-ignore-all(checkov/CKV_DOCKER_2)
# trunk-ignore-all(checkov/CKV_DOCKER_3)
# trunk-ignore-all(hadolint/SC3020)

FROM mcr.microsoft.com/playwright:v1.48.2-noble@sha256:c43809dabac73ac46b136409daa0a7d5411fb3ccc1e7d0fad1be5383a7a0f6ef

RUN if id "ubuntu" &>/dev/null; then \
      userdel -f -r ubuntu || echo "Failed to delete ubuntu user"; \
    fi;
