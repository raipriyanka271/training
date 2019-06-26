

function emp() {
    var emps = [];
    var y = window.localStorage.getItem("emps");
    if (y) {
        emps = JSON.parse(y);}
    console.log(emps);
    var empname = document.getElementById("name").value;
    var empemail = document.getElementById("email").value;
    var empage = document.getElementById("age").value;
    var empsal = document.getElementById("salary").value; 
    var emprem = document.getElementById("remark").value;
    if (empname == "")
        document.getElementById("namecheck").innerHTML = "Field Can Not Be Empty";
    else if (empemail == "")
        document.getElementById("emailcheck").innerHTML = "Field Can Not Be Empty";
    else if (empage == "")
        document.getElementById("agecheck").innerHTML = "Field Can Not Be Empty";
    else if (empsal == "")
        document.getElementById("salcheck").innerHTML = "Field Can Not Be Empty";
    else if (emprem == "")
        document.getElementById("remcheck").innerHTML = "Field Can Not Be Empty";
    else if ((isNaN(empage) || empage < 1 || isNaN(empage) || empage < 1))
        document.getElementById("agecheck").innerHTML = "Only Numeric values are allowed";
    else if ((isNaN(empsal) || empsal < 1 || isNaN(empsal) || empsal < 1))
        document.getElementById("salcheck").innerHTML = "Only Numeric values are allowed";
    else if (checkemail() == true)
        document.getElementById("emailcheck").innerHTML = "Email already exists";

    else if (validateemail() == false)
        document.getElementById("emailcheck").innerHTML = "Email not valid";

    else {
        emps.push({ "addname": empname, "addemail": empemail, "addage": empage, "addsalary": empsal, "addremark": emprem });
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("salary").value = "";
        document.getElementById("remark").value = "";
        document.getElementById("namecheck").innerHTML = " ";
        document.getElementById("emailcheck").innerHTML = " ";
        document.getElementById("agecheck").innerHTML= " ";
        document.getElementById("salcheck").innerHTML = " ";
        document.getElementById("remcheck").innerHTML = " ";
        console.log(emps);
}
    function validateemail() {
        var Email = document.myform.email.value;
        var posat = Email.indexOf("@");
        var posdot = Email.lastIndexOf(".");
        if (posat < 1 || posdot < posat + 2 || posdot + 2 >= Email.length) {

            return false;
        }
        return true;
    }
    function checkemail() {
        var getemail = document.myform.email.value;
        var result = emps.filter(function (emp) {
            return (emp.addemail ===getemail);
        });
        if(result==""){
            return false } else { return true };
       
    }
    window.localStorage.setItem("emps", JSON.stringify(emps));
    console.log(emps);
}
function searchEmp() {
    var emps = [];
    var y = window.localStorage.getItem("emps");
    if (y) {
        emps = JSON.parse(y);
    }
    var empname = document.getElementById("search").value;
    var result = emps.filter(function (emp) {
        return (emp.addname === empname);
    }
    );

    text = "<tr>" + "<td>" + result[0].addname + "</td>"
        + "<td>" + result[0].addemail + "</td>"
        + "<td>" + result[0].addage + "</td>"
        + "<td>" + result[0].addsalary + "</td>"
        + "<td>" + result[0].addremark + "</td>"
    "</tr>"

    document.getElementById("res2").innerHTML = text;
}
function searchE() {
    var emps = [];
    var y = window.localStorage.getItem("emps");
    if (y) {
        emps = JSON.parse(y);
    }
    var empname = document.getElementById("search").value;
    var result = emps.filter(function (emp) {
        return (emp.addname === empname);
    }
    );
    window.location = "edit2.html";
}
function createlist() {

    var emps = [];
    var y = window.localStorage.getItem("emps");
    if (y) {
        emps = JSON.parse(y);
    }

    function displayArrayObjects(arrayObjects) {
        var len = arrayObjects.length, text = "";

        for (var i = 0; i < len; i++) {
            var myObject = arrayObjects[i];

            text += "<tr>" + "<td>" + myObject.addname + "</td>"
                + "<td>" + myObject.addemail + "</td>"
                + "<td>" + myObject.addage + "</td>"
                + "<td>" + myObject.addsalary + "</td>"
                + "<td>" + myObject.addremark + "</td>"
            "</tr>"

        }
        document.getElementById("result").innerHTML = text;
    }

    displayArrayObjects(emps);

}

