#!/bin/bash

case "$1" in
  "start")
    docker-compose -f docker-compose.dev.yml up --build
    ;;
  "stop")
    docker-compose -f docker-compose.dev.yml down
    ;;
  "install")
    docker-compose -f docker-compose.dev.yml exec angular-dev pnpm add "$2"
    ;;
  "install-dev")
    docker-compose -f docker-compose.dev.yml exec angular-dev pnpm add -D "$2"
    ;;
  "shell")
    docker-compose -f docker-compose.dev.yml exec angular-dev sh
    ;;
  *)
    echo "Usage: $0 {start|stop|install|install-dev|shell}"
    echo "Examples:"
    echo "  $0 start"
    echo "  $0 stop"
    echo "  $0 install @ngrx/store"
    echo "  $0 install-dev @angular/material"
    echo "  $0 shell"
    ;;
esac