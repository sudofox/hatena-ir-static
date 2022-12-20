#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

HATENA_HOST="ssl4.eir-parts.net"
HATENA_FETCH_HOST="https://$HATENA_HOST"
S3_FETCH_MODE=false

BOLD="\033[1m"
GRAY="\033[1;37m"
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

if [ -z "$1" ]; then
    echo "Usage: $0 <any fotolife URL>"
    exit 1
fi

URL=$1

function rawurlencode() {
    local string="${1}"
    local strlen=${#string}
    local encoded=""
    local pos c o

    for ((pos = 0; pos < strlen; pos++)); do
        c=${string:$pos:1}
        case "$c" in
        [\+]) printf -v o '%%%02x' "'$c" ;;
        *) o="${c}" ;;
        esac
        encoded+="${o}"
    done
    echo "${encoded}"  # You can either set a return variable (FASTER)
    REPLY="${encoded}" #+or echo the result (EASIER)... or both... :p
}

rawurldecode() {
    # This is perhaps a risky gambit, but since all escape characters must be
    # encoded, we can replace %NN with \xNN and pass the lot to printf -b, which
    # will decode hex for us

    printf -v REPLY '%b' "${1//%/\\x}" # You can either set a return variable (FASTER)

    echo "${REPLY}" #+or echo the result (EASIER)... or both... :p
}

function fixURL() {
    # strip schema (either http or https)
    URL=${URL#http://}
    # strip domain name out of URL
    URL=${URL#*/}
    # strip query string out of URL
    URL=$(echo $URL | sed 's/?.*//g')
}

fixURL

# if FETCH_FORCE is set, skip the existing file check
if [ -z "$FETCH_FORCE" ]; then
    if [ -f ./$HATENA_HOST/$URL ]; then
        echo -e "${BOLD}${GRAY}We already have /${URL}${RESET}" >&2
        exit 0
    fi
fi
# urlencode because S3 is a bit weird about the path
if [ "$S3_FETCH_MODE" = true ]; then
    URL=$(rawurlencode $URL)
fi
# now we add the domain
URL="$HATENA_FETCH_HOST/$URL"

if [ ! -d ./$HATENA_HOST ]; then
    mkdir ./$HATENA_HOST
fi
# wget, create directory structure, no host directory, no clobber, quiet
pushd ./$HATENA_HOST/ >/dev/null

NC_FLAG=""
if [ -z "$FETCH_FORCE" ]; then
    NC_FLAG="-nc"
fi

if wget --max-redirect 0 -x -nH $NC_FLAG -q "$URL"; then
    echo -e "${BOLD}${GREEN}Downloaded ${URL}${RESET}" >&2
else
    echo -e "${BOLD}${RED}Couldn't download ${URL}${RESET}" >&2
fi

popd >/dev/null
