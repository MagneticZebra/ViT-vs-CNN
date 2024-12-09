import numpy as np
import pandas as pd

# Input data files are available in the read-only "../input/" directory

import os
import shutil
from distutils.dir_util import copy_tree
import pandas as pd
path = '/kaggle/input/imagenet-object-localization-challenge/'
output = '/kaggle/working/imagenet-object-localization-challenge/'
os.makedirs(os.path.join(output, 'images'))

copy = shutil.copyfile(os.path.join(path, 'LOC_val_solution.csv'),
                       os.path.join(output, 'LOC_val_solution.csv'))

copied = copy_tree(
    '/kaggle/input/imagenet-object-localization-challenge/ILSVRC/Data/CLS-LOC/val', os.path.join(output, 'images'))

# You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All"
# You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session
os.system(f'zip -r /kaggle/working/imagenet.zip {output}')

copy = shutil.copyfile(os.path.join(path, 'LOC_synset_mapping.txt'),
                       os.path.join(output, 'LOC_synset_mapping.txt'))
