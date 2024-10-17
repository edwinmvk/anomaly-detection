from flask import Flask, jsonify
import numpy as np
from scipy.stats import zscore
from sklearn.ensemble import IsolationForest

# Initializing Flask app
app = Flask(__name__)

flag = True

# Function to simulate financial transactional data stream
def data_stream_simulation(size=1000, seasonal_period=50):
    time = np.arange(size)

    # Create a complex financial-like sinewave pattern with multiple components
    seasonal_pattern = (5 * np.sin(2 * np.pi * time / seasonal_period)) + \
                       (3 * np.sin(2 * np.pi * time / (seasonal_period * 2)))

    # Add a trend to simulate general growth in financial transactions
    trend = 0.05 * time

    # Random noise to mimic volatility in the market
    noise = np.random.normal(0, 1, size)

    # Random anomalies to simulate spikes (e.g., large transactions or unusual events)
    anomalies = np.zeros(size)
    anomalies[np.random.choice(size, size=10, replace=False)] = np.random.choice([-20, 20], size=10)

    # Combining all components
    data_stream = seasonal_pattern + trend + noise + anomalies
    return data_stream

# Function to detect anomalies using Z-Score method
def detect_zscore_anomalies(data, threshold=2):
    z_scores = np.abs(zscore(data))
    anomalies = np.where(z_scores > threshold)[0]
    return anomalies

# Function to detect anomalies using Isolation Forest method
def detect_isolation_forest_anomalies(data, contamination=0.01):
    # Reshape the data for Isolation Forest (it expects a 2D array)
    data = data.reshape(-1, 1)

    # Fit the Isolation Forest model
    isolation_forest = IsolationForest(contamination=contamination, random_state=42)
    predictions = isolation_forest.fit_predict(data)

    # Anomalies are marked as -1 in the predictions
    anomalies = np.where(predictions == -1)[0]
    return anomalies

# Function to combine anomalies detected by both methods
def combine_anomalies(zscore_anomalies, isolation_forest_anomalies):
    # Use set union to merge both anomaly indices and remove duplicates
    combined_anomalies = np.union1d(zscore_anomalies, isolation_forest_anomalies)
    return combined_anomalies

# Route for getting data stream and combined anomalies
@app.route('/data')
def get_stream_with_anomalies():
    global flag  # Declare flag as global to modify its value

    # Simulate Data Stream
    if flag:
        stream = data_stream_simulation()
        flag = False
    else:
        stream = data_stream_simulation(300)

    # Detect Anomalies using Z-Score
    zscore_anomalies = detect_zscore_anomalies(stream)

    # Detect Anomalies using Isolation Forest
    isolation_forest_anomalies = detect_isolation_forest_anomalies(stream)

    # Combine anomalies from both methods
    combined_anomalies = combine_anomalies(zscore_anomalies, isolation_forest_anomalies)

    # Prepare the result as a dictionary
    result = {
        'data_stream': stream.tolist(),  # Convert NumPy array to list for JSON serialization
        'anomalies': combined_anomalies.tolist()  # Convert anomalies to list
    }

    # Return result as JSON
    return jsonify(result)

# Running app
if __name__ == '__main__':
    app.run(debug=True)
