document.getElementById('tab').style.visibility = 'hidden';
var button = document.getElementById('btn');

function clickButton() {
    if (button.getAttribute('clicked') == 'false') {
        button.setAttribute('clicked', 'true');
        fetchAPI();
    }
    else if(button.getAttribute('clicked') ==='true') {
        document.getElementById('tab').innerHTML = '';
        button.setAttribute('clicked', 'false');
        document.getElementById('btn').innerHTML = 'View Holidays';
    }
}

async function fetchAPI() {
    await fetch('https://calendarific.com/api/v2/holidays?&api_key=5508473fc1efa7718598404947262dc4439ccd8e&country=np&year=2021')
    .then(res => res.json())
    .then(data => {
        var length = data.response.holidays.length;

        function makeTable() {
            var table = document.getElementById('tab');
            for (var rowIndex = 0; rowIndex < length; rowIndex++) {
                var tr = document.createElement('tr');

                for(var colIndex=0; colIndex<3; colIndex++) {
                    var td = document.createElement('td');
                    var name = document.createTextNode(data.response.holidays[rowIndex].name);
                    var date = document.createTextNode(data.response.holidays[rowIndex].date.datetime.year + "-" + data.response.holidays[rowIndex].date.datetime.month + "-" + data.response.holidays[rowIndex].date.datetime.day);
                    var description = document.createTextNode(data.response.holidays[rowIndex].description);

                    if (colIndex == 0) {
                        td.appendChild(name);
                    } 
                    else if (colIndex == 1) {
                        td.appendChild(date);
                    }
                    else {
                        td.appendChild(description);
                    }
                    tr.appendChild(td);

                }
                table.appendChild(tr);
            }
        }
        makeTable();
    })
    document.getElementById('tab').style.visibility = 'visible';
    document.getElementById('btn').innerHTML = 'Hide Holidays';
}