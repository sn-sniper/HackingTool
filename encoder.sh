#!/bin/bash

hash_password() {
    local password="$1"
    local hashed_password=$(echo -n "$password" | sha256sum | cut -d ' ' -f1)
    echo "$hashed_password"
}

main() {
    read -p "Enter your password: " password
    hashed_password=$(hash_password "$password")
    echo "Your hashed password: $hashed_password"
}

main
