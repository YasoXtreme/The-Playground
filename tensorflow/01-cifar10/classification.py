from PIL import Image
import numpy as np
from tensorflow import keras

labels = [
    "airplane",
    "automobile",
    "bird",
    "cat",
    "deer",
    "dog",
    "frog",
    "horse",
    "ship",
    "truck"
]

def predict_image_with_keras_model(input_image, model_path, labels_list=labels):
    model = keras.models.load_model(model_path)
    
    if isinstance(input_image, str):
        pil_img = Image.open(input_image)
    else:
        pil_img = Image.fromarray(input_image.astype(np.uint8), mode='L')
    
    pil_img = pil_img.convert('RGB')

    expected_height = model.input_shape[1]
    expected_width = model.input_shape[2]
    pil_img = pil_img.resize((expected_width, expected_height), Image.Resampling.LANCZOS)
    
    preprocessed_image_array = np.array(pil_img).astype(np.float32) / 255.0

    final_input_for_prediction = np.expand_dims(preprocessed_image_array, axis=0)

    raw_predictions = model.predict(final_input_for_prediction)
    probabilities = raw_predictions[0]

    predicted_class_index = np.argmax(probabilities)
    predicted_label = labels_list[predicted_class_index]

    return predicted_label, probabilities

print(predict_image_with_keras_model("image.jpg", "cifar10.keras"))