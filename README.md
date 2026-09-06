#  HealthSecure – Health Insurance Predictor

HealthSecure is a Machine Learning-based web application that predicts estimated health insurance premiums based on a user's personal and health-related information.

The application uses a trained Machine Learning model with a FastAPI backend and an interactive frontend where users can enter their details and receive an estimated insurance premium.

##  Live Demo

🔗 https://health-insurance-predictor-1.onrender.com

##  Features
-  The project uses the Medical Cost Personal Dataset, containing information about individuals and their medical insurance charges.
   The dataset contains: 1,338 records , 7 columns ,No missing values
   Dataset : https://www.kaggle.com/datasets/mirichoi0218/insurance?utm_source=chatgpt.com
-  Uses age, gender, BMI, children, smoking status, and region
-  FastAPI backend & apply pydantic with FastAPI to define and validate the input schema for my insurance prediction API. It ensures that the data received from the frontend has the expected fields and data types before it is passed to the machine learning model."
-  Frontend and backend integrated through REST API
-  Deployed on Render

##  Machine Learning

The following regression models were trained and evaluated:

- Linear Regression
- Random Forest
- Gradient Boosting

###  Best Performing Model

**Gradient Boosting**

| Model | R² Score | RMSE |
|---|---:|---:|
| Linear Regression | 0.784 | 5796.28 |
| Random Forest | 0.863 | 4608.54 |
| Gradient Boosting | **0.880** | **4315.25** |

Gradient Boosting achieved the best performance among the tested models.
Linear Regression was limited because the relationship between insurance charges and features is non-linear. Random Forest handled the non-linear patterns better, but Gradient Boosting performed best because it builds trees sequentially, with each new tree focusing on correcting the errors of the previous trees. 
## Tech Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- HTML
- CSS
- JavaScript

### Deployment & Version Control
- Git
- GitHub
- Render

## How to Run

```bash
1.git clone https://github.com/Kashikaaaa/health-insurance-predictor.git
2.cd health-insurance-predictor
3.python -m venv venv
4.venv\Scripts\activate
5.pip install -r requirements.txt
6.uvicorn backend.main:app --reload
7.Open a new terminal for the frontend:
 python -m http.server 5500 --directory frontend
8.Open http://127.0.0.1:5500 in your browser.


