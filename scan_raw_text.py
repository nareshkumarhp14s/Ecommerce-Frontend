from pathlib import Path
import re

root = Path('src')
pattern = re.compile(r'<(View|ScrollView|Pressable|TouchableOpacity|SafeAreaView|Fragment)[^>]*>(.*?)</\1>', re.S)

for path in root.rglob('*'):
    if path.suffix not in {'.js', '.jsx', '.ts', '.tsx'}:
        continue
    text = path.read_text(encoding='utf-8')
    for idx, match in enumerate(pattern.finditer(text), 1):
        inner = match.group(2)
        # skip blocks that contain nested JSX or expressions
        if '<' in inner or '{' in inner:
            continue
        stripped = inner.strip()
        if stripped and not stripped.startswith('//') and not stripped.startswith('/*'):
            print(f'FILE: {path}')
            print(f'LINE: {text.count(chr(10), 0, match.start()) + 1}')
            print(stripped.splitlines()[0][:160])
            print('---')
