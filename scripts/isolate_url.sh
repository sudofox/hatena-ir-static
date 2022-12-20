#!/bin/bash

perl -MURI -ne 'print URI->new($_)->path, "\n";'
