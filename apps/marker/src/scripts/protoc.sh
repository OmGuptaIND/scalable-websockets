#!/usr/bin/env bash

BASEDIR=$(cd "$(dirname "$0")" && cd .. && cd .. && pwd)
cd "${BASEDIR}"

DIRNAME=$(dirname "$f")/src/gen

echo "DIRNAME: ${DIRNAME}"

echo "Generating proto files..."

# JavaScript code generating

# echo base dir
echo "Base dir: ${BASEDIR}"

PROTOC_GEN_TS_PATH="./node_modules/.bin/proto-loader-gen-types"

for f in ./src/proto/*.proto; do

  # skip the non proto files
  if [ "$(basename "$f")" == "index.ts" ]; then
      continue
  fi

  # loop over all the available proto files and compile them into respective dir
  # JavaScript code generating
  ${PROTOC_GEN_TS_PATH} \
        --longs=String \
        --enums=String \
        --defaults  \
        --oneofs \
        --grpcLib=@grpc/grpc-js \
        --outDir="${DIRNAME}" \
        "$f"

done
