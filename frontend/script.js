const form = document.getElementById("predictionForm");

const button = document.getElementById("predictButton");

const result = document.getElementById("result");

const predictionValue =
    document.getElementById("predictionValue");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get values
    const age =
        Number(document.getElementById("age").value);

    const sex =
        document.getElementById("sex").value;

    const bmi =
        Number(document.getElementById("bmi").value);

    const children =
        Number(document.getElementById("children").value);

    const smoker =
        document.getElementById("smoker").value;

    const region =
        document.getElementById("region").value;


    // Frontend validation

    if (age < 0 || age > 100) {

        alert("Age must be between 0 and 100.");

        return;
    }


    if (bmi <= 0 || bmi > 70) {

        alert("BMI must be between 0 and 70.");

        return;
    }


    if (children < 0 || children > 10) {

        alert("Number of children must be between 0 and 10.");

        return;
    }


    // Loading state

    button.disabled = true;

    button.innerHTML = "Predicting...";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    age: age,

                    sex: sex,

                    bmi: bmi,

                    children: children,

                    smoker: smoker,

                    region: region

                })
            }
        );


        if (!response.ok) {

            throw new Error(
                "Prediction request failed"
            );
        }


        const data = await response.json();


        // Show result

        predictionValue.textContent =
            "$" +
            Number(
                data.predicted_charge
            ).toLocaleString(
                "en-US",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );


        result.classList.remove("hidden");


        // Scroll to result

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


    }

    catch (error) {

        console.error(error);

        alert(
            "Unable to connect to the prediction server. " +
            "Make sure FastAPI is running."
        );

    }

    finally {

        button.disabled = false;

        button.innerHTML =
            'Predict Premium <span>→</span>';

    }

});