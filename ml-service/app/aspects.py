from typing import List, Dict, Any

# Common predefined brand aspects
PREDEFINED_ASPECTS = {
    "pricing": ["price", "cost", "expensive", "cheap", "affordable", "value", "subscription"],
    "customer_service": ["support", "agent", "service", "help", "response", "representative"],
    "quality": ["quality", "durability", "build", "design", "look", "feel", "reliable"],
    "performance": ["speed", "fast", "slow", "bug", "crash", "performance", "lag", "battery"],
    "usability": ["ui", "ux", "interface", "easy", "complex", "intuitive", "navigation"]
}

def extract_aspects(text: str) -> List[Dict[str, Any]]:
    """
    Extracts relevant aspects from the text and estimates polarity per aspect.
    Can be enhanced with dependency parsing or ABSA neural models.
    """
    text_lower = text.lower()
    detected_aspects = []

    positive_cues = {"great", "good", "love", "fast", "affordable", "easy", "amazing", "best", "responsive"}
    negative_cues = {"bad", "slow", "expensive", "hate", "crash", "bug", "worst", "broken", "terrible", "poor"}

    words = set(text_lower.split())

    for aspect, keywords in PREDEFINED_ASPECTS.items():
        if any(kw in text_lower for kw in keywords):
            # Basic polarity association
            has_pos = bool(words & positive_cues)
            has_neg = bool(words & negative_cues)

            if has_pos and not has_neg:
                sentiment = "POSITIVE"
                conf = 0.88
            elif has_neg and not has_pos:
                sentiment = "NEGATIVE"
                conf = 0.86
            else:
                sentiment = "NEUTRAL"
                conf = 0.70

            detected_aspects.append({
                "aspect": aspect,
                "sentiment": sentiment,
                "confidence": conf
            })

    return detected_aspects
