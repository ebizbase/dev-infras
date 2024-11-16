# trunk-ignore-all(trivy/DS002)
# trunk-ignore-all(trivy/DS026)
# trunk-ignore-all(checkov/CKV_DOCKER_2)
# trunk-ignore-all(checkov/CKV_DOCKER_3)
# trunk-ignore-all(hadolint/SC3020)

FROM mcr.microsoft.com/playwright:v1.48.1-noble@sha256:0b464b63fb1c6ceae1a47c8d615c016de277fd08a1df773394f9bba77f4a7550

RUN if id "ubuntu" &>/dev/null; then \
      userdel -f -r ubuntu || echo "Failed to delete ubuntu user"; \
    fi;
