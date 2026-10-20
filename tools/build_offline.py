"""Generate the standalone edition from the canonical ES modules."""
from pathlib import Path
import re
p=Path(__file__).resolve().parents[1]
order=['levels','collision','save','player','view','art','game','audio','input','renderer','main']
parts=[]
for name in order:
    code=(p/'js'/f'{name}.js').read_text()
    code=re.sub(r"import\s+.*?\s+from\s+['\"][^'\"]+['\"];?",'',code)
    code=re.sub(r'\bexport\s+','',code)
    parts.append('// '+name+'.js\n'+code)
html=(p/'index.html').read_text()
html=html.replace('<link rel="stylesheet" href="css/style.css">','<style>'+(p/'css/style.css').read_text()+'</style>')
from urllib.parse import quote
html=html.replace('assets/objects/carrot.svg','data:image/svg+xml,'+quote((p/'assets/objects/carrot.svg').read_text(),safe=''))
html=html.replace('<script type="module" src="js/main.js"></script>','<script>"use strict";(()=>{\n'+'\n'.join(parts)+'\n})();</script>')
import base64
html=html.replace('assets/environment/garden-atlas-v04.png','data:image/png;base64,'+base64.b64encode((p/'assets/environment/garden-atlas-v04.png').read_bytes()).decode())
html=html.replace('href="./"','href="#"')
(p/'carrot-adventure-v0.2.html').write_text(html)
print('Generated carrot-adventure-v0.2.html')
