#!/usr/bin/env bash

BASEDIR=$(cd "$(dirname "$0")" && cd .. && cd .. && pwd)
cd "${BASEDIR}"

echo "Generating proto files..."

# JavaScript code generating

# echo base dir
echo "Base dir: ${BASEDIR}"

PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
GRPC_TOOLS_NODE_PROTOC_PLUGIN="./node_modules/.bin/grpc_tools_node_protoc_plugin"
GRPC_TOOLS_NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

for f in ./src/proto/*.proto; do

  # skip the non proto files
  if [ "$(basename "$f")" == "index.ts" ]; then
      continue
  fi

  # loop over all the available proto files and compile them into respective dir
  # JavaScript code generating
  ${GRPC_TOOLS_NODE_PROTOC} \
      --js_out=import_style=commonjs,binary:"$(dirname "$f")" \
      --grpc_out="$(dirname "$f")" \
      --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
      -I "$(dirname "$f")" \
      "$f"

  ${GRPC_TOOLS_NODE_PROTOC} \
      --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
      --ts_out="$(dirname "$f")" \
      -I "$(dirname "$f")" \
      "$f"

done

