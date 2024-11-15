FROM buildpack-deps:noble-curl

RUN if id "ubuntu" &>/dev/null; then \
        userdel -f -r ubuntu || echo "Failed to delete ubuntu user"; \
    fi; \

