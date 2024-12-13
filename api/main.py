from fastapi import FastAPI
import uvicorn
from transformers import ViTImageProcessor, ViTForImageClassification, BitImageProcessor, BitForImageClassification
import torch


DEVICE = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

# Both ViT and BiT models classify images into one of 1000 classes from ImageNet
processor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')
vit_model = ViTForImageClassification.from_pretrained(
    'google/vit-base-patch16-224').eval().to(DEVICE)
feature_extractor = BitImageProcessor.from_pretrained("google/bit-50")
bit_model = BitForImageClassification.from_pretrained("google/bit-50").eval().to(DEVICE)

def classify(model, processor, image):
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    confidence = torch.nn.Softmax(logits)[predicted_class_idx]
    return predicted_class_idx, confidence

app = FastAPI()


@app.get("/")
async def root():
    return "Hello World!"
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)