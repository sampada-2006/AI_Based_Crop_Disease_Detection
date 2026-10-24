
from pathlib import Path

import torch
import torch.nn as nn
from PIL import Image
from torchvision import models, transforms

BASE_DIR = Path(__file__).resolve().parent

CHECKPOINT_PATH = (
    BASE_DIR
    / "checkpoints"
    / "efficientnet_b0_efficientnetb0_checkpoint .pth"
)

CLASS_NAMES = [
    "Corn_Blight", "Corn_Common_Rust", "Corn_Gray_Leaf_Spot", "Corn_Healthy",
    "Cotton_Aphids", "Cotton_Army worm", "Cotton_Bacterial blight", "Cotton_Healthy",
    "Jute_Cescospora Leaf Spot", "Jute_Golden Mosaic", "Jute_Healthy Leaf",
    "Rice_Bacterialblight", "Rice_Blast", "Rice_Brownspot", "Rice_Tungro",
    "Sugarcane_Healthy", "Sugarcane_Mosaic", "Sugarcane_RedRot",
    "Sugarcane_Rust", "Sugarcane_Yellow",
    "Wheat_Healthy", "Wheat_septoria", "Wheat_stripe_rust",
]

DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])


def load_model():
    if not CHECKPOINT_PATH.is_file():
        raise FileNotFoundError(
            f"Checkpoint not found: {CHECKPOINT_PATH}"
        )

    model = models.efficientnet_b0(weights=None)
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        len(CLASS_NAMES),
    )

    checkpoint = torch.load(
        CHECKPOINT_PATH,
        map_location="cpu",
        weights_only=True,
    )

    model.load_state_dict(checkpoint["model_state_dict"])
    model.to(DEVICE)
    model.eval()

    return model


model = load_model()


def predict_image(image: Image.Image, top_k: int = 3):
    image = image.convert("RGB")
    tensor = preprocess(image).unsqueeze(0).to(DEVICE)

    with torch.inference_mode():
        logits = model(tensor)
        probabilities = torch.softmax(logits, dim=1)[0]
        scores, indices = torch.topk(
            probabilities, min(top_k, len(CLASS_NAMES))
        )

    return [
        {
            "class_name": CLASS_NAMES[idx.item()],
            "confidence": round(score.item(), 4),
        }
        for score, idx in zip(scores, indices)
    ]
