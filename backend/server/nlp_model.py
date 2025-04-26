import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json
import re
import string

# Load only necessary data
print("Loading data...")
df = pd.read_csv('newdataset.csv')

# Load input news
with open('studentchecknews.json', 'r') as file:
    data = json.load(file)
news_text = data.get("news", "")

# Ultra-fast text preprocessing - no spaCy
def fast_preprocess(text):
    if not isinstance(text, str):
        text = str(text)
    # Convert to lowercase, remove punctuation and numbers
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\d+', '', text)
    # Split into words and remove short words
    words = [w for w in text.split() if len(w) > 2]
    return words

# Find text column
if 'news_text' in df.columns:
    text_column = 'news_text'
else:
    text_columns = [col for col in df.columns if df[col].dtype == 'object']
    text_column = text_columns[0] if text_columns else None

# Process texts
if text_column:
    df['Original_Text'] = df[text_column]
    # Use raw text for TF-IDF - much faster
    df['Processed_Text_Str'] = df[text_column].apply(lambda x: str(x).lower())
else:
    print("No text column found. Using all columns.")
    df['Original_Text'] = df.iloc[:, 0]  # Just use first column
    df['Processed_Text_Str'] = df.iloc[:, 0].apply(lambda x: str(x).lower())

# Process input text
input_processed = news_text.lower()
input_words = set(fast_preprocess(news_text))

# TF-IDF with reduced features
vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
try:
    # Try on a sample first if dataset is large
    if len(df) > 1000:
        print("Large dataset detected, using sample for TF-IDF...")
        sample = df.sample(1000)
        vectorizer.fit(sample['Processed_Text_Str'])
    else:
        vectorizer.fit(df['Processed_Text_Str'])
    
    tfidf_matrix = vectorizer.transform(df['Processed_Text_Str'])
    json_tfidf_vector = vectorizer.transform([input_processed])
    df["Similarity"] = cosine_similarity(json_tfidf_vector, tfidf_matrix).flatten()
except Exception as e:
    print(f"TF-IDF error: {e}. Using simpler matching...")
    # Fallback to simple word matching if TF-IDF fails
    df["Similarity"] = 0.0

# Fast keyword matching (skip spaCy processing)
def quick_overlap(text):
    if not isinstance(text, str):
        text = str(text)
    words = set(fast_preprocess(text))
    if not input_words:
        return 0.0
    return len(words.intersection(input_words)) / len(input_words)

df["Overlap"] = df['Processed_Text_Str'].apply(quick_overlap)

# Final score (just averaged)
df["Final_Score"] = (df["Similarity"] + df["Overlap"]) / 2

# Get top results
df_sorted = df.sort_values(by="Final_Score", ascending=False)
top_three = df_sorted.head(3)

# Display results
print("\nINPUT NEWS:")
print(news_text[:100] + "..." if len(news_text) > 100 else news_text)

print("\nTOP 3 MATCHES:")
for i, (_, match) in enumerate(top_three.iterrows()):
    print(f"\nMATCH #{i+1} (Score: {match['Final_Score']:.4f})")
    text = match['Original_Text']
    print(f"{text[:200]}..." if len(str(text)) > 200 else text)

# Save minimal output
top_three[['Original_Text', 'Final_Score']].to_csv('top_three_matches.csv', index=False)
print("\nResults saved to CSV")