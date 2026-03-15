#!/bin/bash
# .claude/hooks/protect-files.sh
# PreToolUse hook: blocks writes to protected files
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

PROTECTED_PATTERNS=(".env" "package-lock.json" ".git/" "manifest.json")

for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "BLOCKED: $FILE_PATH is a protected file. Edit it manually." >&2
    exit 2
  fi
done

exit 0
