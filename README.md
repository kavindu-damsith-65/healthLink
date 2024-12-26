![Healthlink](https://github.com/user-attachments/assets/8ca12e4f-534a-48ce-93dd-4297b8182e9d)

# HealthLink: AI-Powered Tumor Detection

HealthLink is a web-based application designed to improve access to skilled doctors, expedite diagnosis and treatment of tumors, and facilitate second opinions for patients. The application utilizes a machine learning model to identify tumors in MRI scans with high accuracy and offers a user-friendly interface for both patients and healthcare professionals.

![file_2024-09-24_17 00 49](https://github.com/user-attachments/assets/1a361471-7bde-48fc-84b5-c19f1f4f8d30)
![file_2024-09-24_17 01 54](https://github.com/user-attachments/assets/d8659c01-cdfd-4239-810f-93d84321bac0)
![file_2024-09-26_05 20 34](https://github.com/user-attachments/assets/26e8e7ae-f013-4296-ae20-f9cd9b4b7458)

## Features

- **User Levels**: Tailored functionalities for patients and doctors.
- **MRI Scan Upload**: Patients can log in and upload their MRI scans.
- **Tumor Detection**: Machine learning model detects tumors and generates predictive masks.
- **Expert Consultation**: Facilitates communication with doctors for second opinions.
- **Image Bulk Upload**: Users can upload multiple images for evaluation.
- **Secure Data Handling**: Ensures user privacy and confidentiality of medical data.
- **Future Developments**: Includes a history of MRI scans for tumor growth tracking.

## Technologies Used

- **Backend Framework**: Flask
- **Machine Learning**: TensorFlow, Keras
- **Image Processing**: OpenCV, Scikit-image
- **Data Analysis**: Pandas, NumPy
- **Visualization**: Matplotlib
- **Web Development**: HTML, CSS, JavaScript (with Flask for routing)
- **Environment**: Python

## Usage
-Patients can log in and upload their MRI scans.
-The ML model processes the scans and provides a report with tumor detection results.
-If necessary, patients can connect with doctors for further consultation.

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
![file_2024-09-24_17 04 23](https://github.com/user-attachments/assets/ec1131ed-a8a5-4dab-b00a-976222190711)
## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/healthlink.git
   cd healthlink
2. **Create a Virtual Environment**:
    ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
4.**Run the Application**:
  ```bash
   python app.py
5. **Access the Application**: Open your web browser and go to http://localhost:5000

