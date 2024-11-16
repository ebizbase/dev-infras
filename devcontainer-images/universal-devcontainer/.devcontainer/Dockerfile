# trunk-ignore-all(trivy/DS002)
# trunk-ignore-all(trivy/DS026)
# trunk-ignore-all(checkov/CKV_DOCKER_2)
# trunk-ignore-all(checkov/CKV_DOCKER_3)
# trunk-ignore-all(hadolint/SC3020)

FROM buildpack-deps:noble-curl@sha256:61a02a85f7bd808d46ba3bd1dd757f277dc3026c68497a61d40c954ae277519a

RUN if id "ubuntu" &>/dev/null; then \
      userdel -f -r ubuntu || echo "Failed to delete ubuntu user"; \
    fi;

