# Identifying objects using cifar10 👓

The training and testing proccesses of a model that can identify objects in images using the cifar10 database.

## Structure

- **`cifar10.ipynb`:** includes the training process.
- `cifar10.keras`: where the model is stored.
- `classification.py`: allows for testing the model with a custom image.
- `image.jpg`: the image you want to test the model with in `classification.py`. Can be of any aspect ratio, but stick with 1:1 for intended results.
- `requirements.txt`: the python libraries you will need to run this experiment successfully.

## Usage

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Start the classification:

   ```bash
   python classification.py
   ```
