function compound() {
    if (document.querySelector('table') !== null)
    {
        document.querySelector('table').remove();
    }

    let principal = parseFloat(document.getElementById('principal').value);
    let interest = parseFloat(document.getElementById('interest').value);
    let years = parseInt((document.getElementById('years')).value);
 
    
    if(isNaN(principal) || isNaN(interest) || isNaN(years))
    {
        return;
    }
    const table = document.createElement('table');
    let thead = table.createTHead();
    let tbody = table.createTBody();
    thead.innerHTML = "<tr><th>Year</th><th>Amount</th><th>Interest</th></tr>"
    
    for (let i = 0, n = years; i <= n; i++)
    {
        let row = tbody.insertRow(i);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = i;
        cell2.innerHTML = principal.toFixed(2);
        cell3.innerHTML = ((principal / 100) * interest).toFixed(2) ;
        principal += (principal / 100) * interest;
    }
    document.body.appendChild(table);
}


document.addEventListener('DOMContentLoaded', () => {
    let btn = document.getElementById('submit');
    btn.addEventListener('click', compound);
});