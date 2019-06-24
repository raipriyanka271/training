function validateForm() 
{
	
  var email1= "priyanka@cronj.com";
  var email2= document.getElementById("email").value;
  var password2= "cronjit";
  var password1= document.getElementById("password").value;
  if(password1==password2 && email1==email2)
	window.location="details.html"
    else
    document.getElementById("result").innerHTML="EMAIL PASSWORD DOESN'T MATCH";
}
function addEmp() {
    var emps = [];
    var empname = document.getElementById("name").value;
    var empemail = document.getElementById("email").value;
    var empage = document.getElementById("age").value;
    var empsal = document.getElementById("salary").value;
    var emprem = document.getElementById("remark").value;

    var emps = [];
    var y = window.localStorage.getItem("emps");
    if (y) {
        emps = JSON.parse(y);
    }
    console.log(emps);
    if (empname == "" || empemail == "" || empage == "" || empsal == "" || emprem == "")
        alert("Field Can Not Be Empty");
    else if (isNaN(empsal) || empsal < 1 || isNaN(empage) || empage < 1)
        alert("ONLY NUMERIC VALUES ALLOWED");
    else
        emps.push({ "addname": empname, "addemail": empemail, "addage": empage, "addsalary": empsal, "addremark": emprem });
    console.log(emps);

    window.localStorage.setItem("emps", JSON.stringify(emps));
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

        document.write(" Name:" + " " + result[0].addname + " " + " Email: " + result[0].addemail + " Age:" + " " + result[0].addage + " Salary: " + " " + result[0].addsalary + " Remark :" + " " + result[0].addremark);

    };
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


    };
    function createlist(){
        alert("123");
    var emps = [];
        var y = window.localStorage.getItem("emps");
        if (y) {
            emps = JSON.parse(y);
        }
    
    function displayArrayObjects(arrayObjects) {
        var len = arrayObjects.length, text = "";

        for (var i = 0; i < len; i++) {
            var myObject = arrayObjects[i];

            text+="<tr>"+"<td>"+myObject.addname+"<td>"
            +"<td>"+myObject.addemail+"<td>"
            +"<td>"+myObject.addage+"<td>"
            +"<td>"+myObject.addsalary+"<td>"
            +"<td>"+myObject.addremark+"<td>"
            "<tr>"

        }


       document.getElementById("result").innerHTML=text;
    }

    displayArrayObjects(emps);    

    }
    
