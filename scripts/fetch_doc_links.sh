#!/bin/bash

for num in $(seq 1 20); do
  curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/press/press_$num.js | grep '"link_tanshin"' | grep -Po "http.+?(?=\")" | sort -u
  curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/announcement/announcement_$num.js | grep '"link"' | grep -Po "http.+?(?=\")" | sort -u
  curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/ir_material_for_fiscal_ym/ir_material_for_fiscal_ym_$num.js | grep '"link"' | grep -Po "http.+?(?=\")" | sort -u
done
