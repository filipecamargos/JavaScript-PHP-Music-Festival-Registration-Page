/***********************************
 * Responsible for the Student 2
 * *********************************/
$(function() {

    //get the change on the card - student
    $(".card").change(function() {

        //get the imput values
        let performance = $('input[name="performance"]:checked').val();
        let student2 = $("#student2");

        //check what inputs we have so we can change accordingly
        if (performance == "Duet") {
            student2.css("display", "block");
            $("#first_nameA").prop('required', true);
            $("#last_nameA").prop('required', true);
            $("#student_idA").prop('required', true);

        } else {
            student2.css("display", "none");
            $("#first_nameA").prop('required', false);
            $("#last_nameA").prop('required', false);
            $("#student_idA").prop('required', false);

        }
    });

    //Get the Form
    let theForm = document.getElementById("myForm");

    //Action when the button is clicked to submit it 
    document.getElementById("pay-button").addEventListener('click', submitForm);

    //Display the result
    function display(result) {

        //Place to display the data
        let placeToDisplay = document.getElementById('displayInfo');

        let textTobeDisplayed = "";
        for (person of result) {

            textTobeDisplayed += '<div class="personInfo">';
            textTobeDisplayed += "<p>Performance Style: " + person.type + "</p>"
            textTobeDisplayed += "<p>Time: " + person.time + "</p>"
            textTobeDisplayed += "<p>Name: " + person.fname + " " + person.lname + "</p>";
            textTobeDisplayed += "<p>Student ID: " + person.student + "</p>";
            textTobeDisplayed += "<p>Skill Level: " + person.skill + "</p>";
            textTobeDisplayed += "<p>Instrument: " + person.instrument + "</p>";
            textTobeDisplayed += "<p>Location: " + person.location + ", room " + person.room + "</p>";

            if (person.type == "Duet") {
                textTobeDisplayed += '<p><br>Companion: ' + person.fnameA + " " + person.lnameA + '<p>';
                textTobeDisplayed += "<p>Student ID: " + person.studentA + "</p>";
            }

            textTobeDisplayed += '</div>'
        }

        placeToDisplay.innerHTML = textTobeDisplayed;
    }

    //When the page loads we get the information in the file
    $(document).ready(function() {
        $.getJSON('data/data.txt', function(result) {
            display(result);
        })
    });

    //This function will get the infomation from the file if there is a file
    function getInfomation() {
        let theData = new FormData(theForm);
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(this.response);

                console.log(result);
                display(result);
            }
        };
        xhr.open("POST", "registration.php");
        xhr.send(theData);
    }

    //submit function
    function submitForm() {
        if (!theForm.checkValidity()) {
            document.getElementById("myForm").reportValidity();
        } else {
            getInfomation();
        }
    }
});