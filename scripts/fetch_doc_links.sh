#!/bin/bash

curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/press/press_3.js | grep link_tanshin | grep -Po "htt.+?(?=\")" |sort -u
curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/ir_material_for_fiscal_ym/ir_material_for_fiscal_ym_14.js|grep '"link"'|grep -Po "http.+?(?=\")"|sort -u
curl -s https://ssl4.eir-parts.net/V4Public/EIR/3930/ja/announcement/announcement_11.js | grep '"link"'|grep -Po "http.+?(?=\")"|sort -u
