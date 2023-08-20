#!/bin/bash

root="$(git rev-parse --show-toplevel)";

cd $root;

f="$1"
echo "Processing $f file..."
# take action on each file. $f store current file name
filename="${f##*/}"
filename="${filename%.*}"

abcm2ps "$f" -O =
ps2pdf "$filename.ps" "$filename.pdf"
rm "$filename.ps"

