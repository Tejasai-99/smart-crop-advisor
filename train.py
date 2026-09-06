import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load dataset
df = pd.read_csv("Crop_recommendation.csv")

# Features and target
X = df.drop(["label"], axis=1)
y = df["label"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# Create model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

# Train model
model.fit(X_train, y_train)

# -----------------------------
# Model Evaluation
# -----------------------------

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)

print("\nClassification Report:")
print(classification_report(y_test, y_pred))


# -----------------------------
# Top 5 Crop Recommendation
# -----------------------------

y_proba = model.predict_proba(X_test)

classes = model.classes_

# First test sample
sample = y_proba[0]

top5_indices = sample.argsort()[-5:][::-1]

print("\nTop 5 Crop Recommendations:")

for index in top5_indices:
    crop = classes[index]
    probability = sample[index] * 100

    print(f"{crop}: {probability:.2f}%")

import joblib

joblib.dump(model, "crop_model.pkl")

print("\nModel saved successfully!")