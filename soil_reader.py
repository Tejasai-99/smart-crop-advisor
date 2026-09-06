import re
import os
import fitz
import pytesseract
from PIL import Image


# ============================================
# TESSERACT CONFIGURATION
# ============================================

import shutil

tesseract_path = shutil.which("tesseract")

if tesseract_path:
    pytesseract.pytesseract.tesseract_cmd = tesseract_path


# ============================================
# Extract text from image
# ============================================

def extract_text_from_image(file_path):
    image = Image.open(file_path)

    # Convert image to RGB
    image = image.convert("RGB")

    # OCR
    text = pytesseract.image_to_string(image)

    return text


# ============================================
# Extract text from normal PDF
# ============================================

def extract_text_from_pdf(file_path):
    document = fitz.open(file_path)

    text = ""

    for page in document:
        page_text = page.get_text()
        text += page_text + "\n"

    document.close()

    return text


# ============================================
# Extract text from scanned PDF
# ============================================

def extract_text_from_scanned_pdf(file_path):
    document = fitz.open(file_path)

    text = ""

    for page in document:

        # Convert PDF page to high-resolution image
        pix = page.get_pixmap(
            matrix=fitz.Matrix(2, 2)
        )

        image = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        # OCR the page
        page_text = pytesseract.image_to_string(image)

        text += page_text + "\n"

    document.close()

    return text


# ============================================
# Extract text from report
# ============================================

def extract_text(file_path):

    extension = os.path.splitext(file_path)[1].lower()

    # ----------------------------------------
    # JPG / JPEG / PNG
    # ----------------------------------------

    if extension in [".jpg", ".jpeg", ".png"]:

        return extract_text_from_image(file_path)


    # ----------------------------------------
    # PDF
    # ----------------------------------------

    elif extension == ".pdf":

        # First try normal PDF text extraction
        text = extract_text_from_pdf(file_path)

        # If text exists, use it
        if text.strip():

            print("✅ Text extracted directly from PDF.")

            return text

        # Otherwise use OCR
        print("⚠️ PDF contains no selectable text.")
        print("🔄 Using OCR on PDF pages...")

        return extract_text_from_scanned_pdf(file_path)


    # ----------------------------------------
    # Unsupported format
    # ----------------------------------------

    else:

        raise ValueError(
            "Unsupported file format. "
            "Please upload JPG, PNG or PDF."
        )


# ============================================
# Extract soil values
# ============================================

def extract_soil_values(file_path="soil_report.png"):

    # ----------------------------------------
    # Get text from image / PDF
    # ----------------------------------------

    text = extract_text(file_path)

    print("\n========== OCR / PDF TEXT ==========\n")

    print(text)

    print("\n=====================================\n")


    # ----------------------------------------
    # Normalize OCR text
    # ----------------------------------------

    # Replace new lines with spaces
    clean_text = text.replace("\n", " ")

    # OCR can read table lines as |
    clean_text = clean_text.replace("|", " ")

    # Normalize multiple spaces
    clean_text = re.sub(
        r"\s+",
        " ",
        clean_text
    )


    # ========================================
    # Nitrogen
    # ========================================

    nitrogen_match = re.search(
        r"Nitrogen\s*(?:\([^)]*\))?"
        r".{0,30}?"
        r"(\d+(?:\.\d+)?)",
        clean_text,
        re.IGNORECASE
    )


    # ========================================
    # Phosphorus
    # ========================================

    phosphorus_match = re.search(
        r"Phosphorus\s*(?:\([^)]*\))?"
        r".{0,30}?"
        r"(\d+(?:\.\d+)?)",
        clean_text,
        re.IGNORECASE
    )


    # ========================================
    # Potassium
    # ========================================

    potassium_match = re.search(
        r"Potassium\s*(?:\([^)]*\))?"
        r".{0,30}?"
        r"(\d+(?:\.\d+)?)",
        clean_text,
        re.IGNORECASE
    )


    # ========================================
    # pH
    # ========================================

    ph_match = re.search(
        r"\bpH\b\s*(?:\([^)]*\))?"
        r".{0,20}?"
        r"(\d+(?:\.\d+)?)",
        clean_text,
        re.IGNORECASE
    )


    # ========================================
    # Check extraction
    # ========================================

    if not nitrogen_match:

        raise ValueError(
            "Could not extract Nitrogen (N)."
        )


    if not phosphorus_match:

        raise ValueError(
            "Could not extract Phosphorus (P)."
        )


    if not potassium_match:

        raise ValueError(
            "Could not extract Potassium (K)."
        )


    if not ph_match:

        raise ValueError(
            "Could not extract pH."
        )


    # ========================================
    # Convert to float
    # ========================================

    nitrogen = float(
        nitrogen_match.group(1)
    )

    phosphorus = float(
        phosphorus_match.group(1)
    )

    potassium = float(
        potassium_match.group(1)
    )

    ph = float(
        ph_match.group(1)
    )


    # ========================================
    # Validate values
    # ========================================

    if nitrogen < 0:

        raise ValueError(
            "Invalid Nitrogen value."
        )


    if phosphorus < 0:

        raise ValueError(
            "Invalid Phosphorus value."
        )


    if potassium < 0:

        raise ValueError(
            "Invalid Potassium value."
        )


    if ph < 0 or ph > 14:

        raise ValueError(
            "Invalid pH value. "
            "pH must be between 0 and 14."
        )


    # ========================================
    # Return ONLY required values
    # ========================================

    return {
        "N": nitrogen,
        "P": phosphorus,
        "K": potassium,
        "ph": ph
    }