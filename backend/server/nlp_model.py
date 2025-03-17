import spacy
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from textblob import TextBlob
from gensim.models import Word2Vec
import os
import tempfile


# Load dataset
df = pd.read_csv('newdataset.csv')
print("Dataset Loaded!")

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Read JSON file
with open('studentchecknews.json', 'r') as file:
    data = json.load(file)

# Extract news text safely
news_text = data.get("news", "")

# Function to preprocess text: Tokenization, Lemmatization, Stopword Removal
def preprocess_text(text):
    # Convert to string first and handle non-string inputs
    if not isinstance(text, str):
        text = str(text)
    
    doc = nlp(text.lower())  # Convert to lowercase
    return [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]

# Store original texts from dataset
if 'news_text' in df.columns:
    df['Original_Text'] = df['news_text']
else:
    # Try to identify the column that might contain the news text
    text_columns = [col for col in df.columns if df[col].dtype == 'object' and col != 'Processed_Text']
    if text_columns:
        # Use the first text column as a fallback
        df['Original_Text'] = df[text_columns[0]]
    else:
        # If no obvious text column, create a placeholder
        df['Original_Text'] = df.apply(lambda row: " ".join(map(str, [row[col] for col in df.columns if col != 'Processed_Text'])), axis=1)

# Preprocess JSON input text
json_lemmas = preprocess_text(news_text)

# Preprocess dataset rows
if 'news_text' in df.columns:
    df["Processed_Text"] = df['news_text'].apply(preprocess_text)
else:
    # Try to identify the column that might contain the news text
    text_columns = [col for col in df.columns if df[col].dtype == 'object']
    if text_columns:
        df["Processed_Text"] = df[text_columns[0]].apply(preprocess_text)
    else:
        # Fallback to processing all columns but warn about it
        print("Warning: No obvious text column found. Processing all columns combined.")
        df["Processed_Text"] = df.apply(lambda row: preprocess_text(" ".join(map(str, row))), axis=1)

# Train Word2Vec on dataset
w2v_model = Word2Vec(df["Processed_Text"], vector_size=100, window=5, min_count=1, workers=4)

# Word2Vec similarity function
def word2vec_similarity(row_words):
    # Calculate JSON vector
    json_vectors = [w2v_model.wv[word] for word in json_lemmas if word in w2v_model.wv]
    
    # Calculate row vector
    row_vectors = [w2v_model.wv[word] for word in row_words if word in w2v_model.wv]
    
    # If either has no valid vectors, return 0 similarity
    if not json_vectors or not row_vectors:
        return 0.0
    
    # Calculate mean vectors
    json_vector = np.mean(json_vectors, axis=0)
    row_vector = np.mean(row_vectors, axis=0)
    
    # Calculate cosine similarity
    similarity = np.dot(json_vector, row_vector) / (np.linalg.norm(json_vector) * np.linalg.norm(row_vector) + 1e-5)
    
    return float(similarity)  # Return a scalar value

# Apply Word2Vec similarity to each row
df["Word2Vec_Similarity"] = df["Processed_Text"].apply(word2vec_similarity)

# TF-IDF Vectorization
vectorizer = TfidfVectorizer()
corpus = df["Processed_Text"].apply(lambda words: " ".join(words)).tolist()
tfidf_matrix = vectorizer.fit_transform(corpus)

# Compute TF-IDF for JSON text
json_tfidf_vector = vectorizer.transform([" ".join(json_lemmas)])

# Compute TF-IDF similarity for each row
df["TFIDF_Similarity"] = cosine_similarity(json_tfidf_vector, tfidf_matrix).flatten()

# Compute Sentiment Analysis for dataset rows
df["Sentiment_Score"] = df["Processed_Text"].apply(lambda words: TextBlob(" ".join(words)).sentiment.polarity)

# Compute Sentiment Score for JSON text
json_sentiment_score = TextBlob(news_text).sentiment.polarity

# Calculate length of input news for more specific matching
json_length = len(json_lemmas)

# Function to calculate keyword overlap percentage
def calculate_keyword_overlap(row_words):
    # Count how many important words from the input appear in this row
    input_keywords = set(json_lemmas)
    row_keywords = set(row_words)
    
    if len(input_keywords) == 0:
        return 0.0
        
    overlap = len(input_keywords.intersection(row_keywords))
    overlap_percentage = overlap / len(input_keywords)
    
    return overlap_percentage

# Apply keyword overlap calculation
df["Keyword_Overlap"] = df["Processed_Text"].apply(calculate_keyword_overlap)

# Calculate length similarity (penalize texts that are very different in length)
df["Length_Similarity"] = 1 - abs(df["Processed_Text"].apply(len) - json_length) / max(df["Processed_Text"].apply(len).max(), json_length)

# Compute final similarity score with stricter weighting
df["Final_Score"] = (
    (df["TFIDF_Similarity"] * 0.4) + 
    (df["Word2Vec_Similarity"] * 0.2) + 
    (df["Keyword_Overlap"] * 0.3) +
    (df["Length_Similarity"] * 0.05) +
    ((1 - abs(df["Sentiment_Score"] - json_sentiment_score)) * 0.05)
)

# Sort dataset by relevance
df_sorted = df.sort_values(by="Final_Score", ascending=False)

# ===== Display Top 3 News Matches Regardless of Score =====

print("\n" + "="*50)
print("INPUT NEWS:")
print("="*50)
print(news_text)

print("\n" + "="*50)
print("TOP 3 NEWS MATCHES:")
print("="*50)

# Always show the top 3 matches (if there are at least 3 items in the dataset)
top_n = min(3, len(df_sorted))
for i in range(top_n):
    match = df_sorted.iloc[i]
    print(f"\nMATCH #{i+1} (Score: {match['Final_Score']:.4f})")
    print(f"{match['Original_Text']}")
    print("-" * 30)

# Save only top 3 results to CSV
top_three = df_sorted.head(3)
try:
    # Try saving to the original location
    top_three[['Original_Text', 'Final_Score']].to_csv('top_three_matches.csv', index=False)
    print("\nTop three matches saved to 'top_three_matches.csv'")
except PermissionError:
    # Try saving to a different location - user's temp directory
    temp_dir = tempfile.gettempdir()
    result_path = os.path.join(temp_dir, 'top_three_matches.csv')
    
    try:
        top_three[['Original_Text', 'Final_Score']].to_csv(result_path, index=False)
        print(f"\nPermission issue with original file. Results saved to '{result_path}'")
    except Exception as e:
        # If even the temp directory fails, just print the error and skip saving
        print(f"\nCouldn't save results file: {e}")