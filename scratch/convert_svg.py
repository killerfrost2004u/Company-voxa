import base64
import os
from PIL import Image

def image_to_svg(image_path, svg_path):
    print(f'Converting {image_path} to {svg_path}...')
    try:
        img = Image.open(image_path)
        width, height = img.size
        
        mime = 'image/png'
        if image_path.endswith('.webp'):
            mime = 'image/webp'
        elif image_path.endswith('.jpg'):
            mime = 'image/jpeg'
            
        with open(image_path, 'rb') as f:
            b64_data = base64.b64encode(f.read()).decode('utf-8')
            
        svg_content = f'''<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
  <image href="data:{mime};base64,{b64_data}" width="{width}" height="{height}" />
</svg>'''
        
        with open(svg_path, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f'Done converting {image_path}')
    except Exception as e:
        print(f'Error: {e}')

base_dir = r'c:\Users\L\antigravity\bold-mendel\public\logos'

image_to_svg(
    os.path.join(base_dir, 'voxa_logo_original.png'),
    os.path.join(base_dir, 'voxa_logo_original.svg')
)

image_to_svg(
    os.path.join(base_dir, 'voxa_logo.webp'),
    os.path.join(base_dir, 'voxa_logo_webp.svg')
)
