import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
import joblib
import os

os.makedirs("models", exist_ok=True)

tickers = {
    "RELIANCE.NS": "reliance_model.pkl",
    "TCS.NS": "tcs_model.pkl",
    "HDFCBANK.NS": "hdfc_model.pkl"
}

for ticker, filename in tickers.items():
    print(f"Fetching data for {ticker}")
    data = yf.download(ticker, period="60d", interval="1d")
    data.dropna(inplace=True)

    data["Day"] = np.arange(len(data))
    X = data[["Day"]]
    y = data["Close"]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, f"models/{filename}")
    print(f"Model saved for {ticker} → models/{filename}")
