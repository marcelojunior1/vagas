import json

from keras.src.saving.saving_api import load_model

def get_char2idx():
    f = open('ml/char2idx.json')
    char2idx = json.load(f)
    return char2idx

def get_model():
    return load_model('ml/model.keras')

