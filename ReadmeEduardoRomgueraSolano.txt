Hello!
Thank you for checking my submission to the challenge. I had fun working on this and learn some useful stuff.

Project objectives:
 -Capture brute salary from human on a web formulary.
 -Process the salary info on a serverless API.
 -Show the response data to human on a web formulary.

Project has 2 layers:
	- UI is basic HTML, CSS and JavaScript. It makes a call to the API to process thee salary and do proper calculations.

	- API applies the embeded logic to make the calculations on salary deductions according to Costa Rica´s law.

Code is available here:
https://github.com/EduardoRomaguera/salaryCalculator

You can access the web UI here:
https://eduardoromaguera.github.io/salaryCalculator/

Also you can test the API directly on postman using the collection file that is next to this file or this parameters:
URL=
https://httpfunction20211014192914.azurewebsites.net/api/function1
Method=
GET
Body=
{
    "salary": 5000000,
    "sAssociation": 0,
    "others": 0
}

