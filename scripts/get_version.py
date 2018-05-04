from __future__ import print_function
import json
import os

base_path = os.path.dirname(os.path.abspath(__file__))
json_file = os.path.join(base_path, '../package.json')


with open(json_file) as data_file:
    data = json.load(data_file)
    version = data["version"]
    print(version, end='')
